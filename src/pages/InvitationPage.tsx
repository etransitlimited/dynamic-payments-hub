
import React, { useEffect } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import AuthCard from "@/components/auth/AuthCard";
import { useParams, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSEO } from "@/utils/seo";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

const InvitationPage = () => {
  const { t, language } = useSafeTranslation();
  const location = useLocation();
  const { token } = useParams();
  const { getMetadata } = useSEO({});
  const metadata = getMetadata(location.pathname, language);
  
  // Add component render logging for debugging
  useEffect(() => {
    console.log("InvitationPage component mounted, language:", language);
    console.log("Invitation token:", token);
    return () => console.log("InvitationPage component unmounted");
  }, [language, token]);

  // Handle invitation acceptance
  const handleAcceptInvitation = () => {
    console.log("Accepting invitation with token:", token);
    // Implement invitation acceptance logic
  };

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        {metadata.meta.map((meta, index) => (
          <meta key={`meta-${index}`} {...meta} />
        ))}
        {metadata.script.map((script, index) => (
          <script key={`script-${index}`} {...script} />
        ))}
      </Helmet>
      <AuthCard
        title={t('invitation.title', 'You have been invited')}
        description={t('invitation.description', 'Complete your registration to accept the invitation')}
        footer={
          <div className="text-center text-blue-200 relative z-10">
            <Link
              to="/login"
              className="text-blue-300 hover:text-blue-200 underline transition-colors relative z-10"
            >
              {t('auth.alreadyHaveAccount', 'Already have an account?')}
            </Link>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="bg-blue-900/30 p-4 rounded-md">
            <p className="text-blue-200">
              {t('invitation.message', 'You have been invited to join our platform. Please complete your registration to get started.')}
            </p>
          </div>
          
          <Button 
            onClick={handleAcceptInvitation}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {t('invitation.acceptButton', 'Accept Invitation')}
          </Button>
        </div>
      </AuthCard>
    </>
  );
};

export default InvitationPage;
