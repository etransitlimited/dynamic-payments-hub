
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Check, X, AlertCircle, File, Image } from "lucide-react";
import { toast } from "sonner";
import TranslatedText from "@/components/translation/TranslatedText";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label: string;
  description?: string;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
  required?: boolean;
  onChange: (file: File | null) => void;
  keyPrefix: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  description,
  acceptedFileTypes = "image/*,.pdf,.doc,.docx",
  maxFileSizeMB = 5,
  required = false,
  onChange,
  keyPrefix
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // 清除预览URL的副作用
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    validateAndProcessFile(selectedFile);
  };

  const validateAndProcessFile = (selectedFile: File | null) => {
    // 清除之前的预览URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    if (!selectedFile) {
      setFile(null);
      setUploadError(null);
      setUploadSuccess(false);
      onChange(null);
      return;
    }

    // Validate file size
    if (selectedFile.size > maxFileSizeMB * 1024 * 1024) {
      setUploadError(`verification_file_size_error`);
      setFile(null);
      setUploadSuccess(false);
      onChange(null);
      return;
    }

    // Validate file type
    const fileType = selectedFile.type;
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
    
    const acceptedTypes = acceptedFileTypes.split(',');
    
    let isValidType = false;
    for (const type of acceptedTypes) {
      if (type.includes('/*')) {
        // Handle wildcard mime types like 'image/*'
        const typeCategory = type.split('/')[0];
        if (fileType.startsWith(`${typeCategory}/`)) {
          isValidType = true;
          break;
        }
      } else if (type.startsWith('.')) {
        // Handle file extensions like '.pdf'
        if (fileExtension === type.substring(1)) {
          isValidType = true;
          break;
        }
      } else {
        // Handle specific mime types
        if (fileType === type) {
          isValidType = true;
          break;
        }
      }
    }

    if (!isValidType) {
      setUploadError(`verification_file_type_error`);
      setFile(null);
      setUploadSuccess(false);
      onChange(null);
      return;
    }

    // File is valid, process it
    setFile(selectedFile);
    setUploadError(null);
    setIsUploading(true);
    
    // 创建文件预览URL（如果是图片）
    if (selectedFile.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(null);
    }
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      onChange(selectedFile);
      toast.success(<TranslatedText keyName="verification_file_uploaded" fallback="File uploaded successfully" />);
    }, 1500);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files?.[0] || null;
    validateAndProcessFile(droppedFile);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setUploadSuccess(false);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange(null);
  };

  const getAcceptedTypesMessage = () => {
    if (acceptedFileTypes.includes('image/*')) {
      return <TranslatedText keyName="verification_accepted_images" fallback="Images" />;
    } else if (acceptedFileTypes.includes('.pdf')) {
      return <TranslatedText keyName="verification_accepted_pdf" fallback="PDF documents" />;
    } else {
      return <TranslatedText keyName="verification_accepted_documents" fallback="Documents" />;
    }
  };

  const isImage = file?.type.startsWith('image/');
  const isPdf = file?.type === 'application/pdf' || file?.name.toLowerCase().endsWith('.pdf');

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="font-medium text-sm text-gray-200">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </div>
        {uploadSuccess && (
          <div className="text-xs text-green-500 flex items-center">
            <Check className="h-3 w-3 mr-1" />
            <TranslatedText keyName="verification_file_ready" fallback="File ready" />
          </div>
        )}
      </div>
      
      {description && (
        <p className="text-xs text-gray-400">{description}</p>
      )}
      
      <div
        className={cn(
          "border-2 border-dashed rounded-lg transition-colors",
          isDragOver ? "border-blue-500 bg-blue-900/30" : "border-blue-800/50",
          uploadSuccess ? "bg-green-900/20 border-green-700/50" : "",
          uploadError ? "bg-red-900/20 border-red-700/50" : "",
          "hover:border-blue-500/70 hover:bg-blue-900/10",
          uploadSuccess && previewUrl ? "p-0 overflow-hidden" : "p-4",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={acceptedFileTypes}
          className="hidden"
          disabled={isUploading}
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="animate-pulse flex flex-col items-center">
              <Upload className="h-6 w-6 text-blue-400 mb-2" />
              <span className="text-sm text-blue-300">
                <TranslatedText keyName="verification_uploading" fallback="Uploading..." />
              </span>
            </div>
          </div>
        ) : file && uploadSuccess ? (
          <div>
            {previewUrl && isImage ? (
              <div className="relative group">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-auto rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
                  <button 
                    onClick={handleRemoveFile}
                    className="p-2 bg-red-500/80 rounded-full hover:bg-red-600"
                    type="button"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                  {isImage ? (
                    <Image className="h-6 w-6 text-green-400" />
                  ) : isPdf ? (
                    <File className="h-6 w-6 text-blue-400" />
                  ) : (
                    <File className="h-6 w-6 text-green-400" />
                  )}
                  <div className="text-left">
                    <p className="text-sm font-medium text-green-300 truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(file.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleRemoveFile}
                  className="p-1 hover:bg-red-900/20 rounded"
                  type="button"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-red-400" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4">
            <Upload className={cn(
              "h-8 w-8 mb-2",
              uploadError ? "text-red-400" : "text-blue-400"
            )} />
            
            {uploadError ? (
              <div className="space-y-1">
                <p className="text-sm text-red-400 flex items-center justify-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  <TranslatedText keyName={uploadError} fallback="Invalid file" />
                </p>
                <p className="text-xs text-gray-400">
                  <TranslatedText 
                    keyName={`${keyPrefix}_try_again`} 
                    fallback="Please try again with a valid file" 
                  />
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-sm text-gray-300">
                  <TranslatedText 
                    keyName={`${keyPrefix}_drag_drop`} 
                    fallback="Drag and drop your file here" 
                  />
                </p>
                <p className="text-xs text-gray-400">
                  <TranslatedText 
                    keyName={`${keyPrefix}_or_click`} 
                    fallback="or click to browse" 
                  />
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {!uploadSuccess && (
        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
          <div>
            <TranslatedText 
              keyName={`${keyPrefix}_accepted_types`} 
              fallback="Accepted:" 
            /> {getAcceptedTypesMessage()}
          </div>
          <div>
            <TranslatedText 
              keyName="verification_max_size" 
              fallback="Max:" 
            /> {maxFileSizeMB}MB
          </div>
        </div>
      )}
      
      {!isUploading && !uploadSuccess && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full mt-2 bg-blue-900/20 border-blue-800/30 hover:bg-blue-900/40 hover:border-blue-700/50"
          onClick={handleButtonClick}
        >
          <Upload className="h-4 w-4 mr-2" />
          <TranslatedText keyName={`${keyPrefix}_upload_file`} fallback="Upload File" />
        </Button>
      )}
      
      {uploadSuccess && !previewUrl && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full mt-2 bg-green-900/20 border-green-800/30 hover:bg-green-900/40 hover:border-green-700/50"
          onClick={handleButtonClick}
        >
          <Upload className="h-4 w-4 mr-2" />
          <TranslatedText keyName="verification_change_file" fallback="Change File" />
        </Button>
      )}
    </div>
  );
};

export default FileUpload;
