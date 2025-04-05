
import { ReactNode } from "react";
import { ShieldCheck, Users, Settings } from "lucide-react";

export interface Role {
  id: string;
  name: string;
  icon: ReactNode;
  access: string;
  color: string;
  permissions?: {
    system: boolean[];
    business: boolean[];
  };
}

export const getRoleIcon = (roleType: string) => {
  switch (roleType) {
    case "admin":
      return <ShieldCheck className="h-5 w-5 text-blue-400" />;
    case "manager":
      return <Users className="h-5 w-5 text-green-400" />;
    case "staff":
      return <Settings className="h-5 w-5 text-amber-400" />;
    default:
      return <Users className="h-5 w-5 text-purple-400" />;
  }
};

export const getRoleColor = (accessLevel: string) => {
  switch (accessLevel) {
    case "full":
      return "blue";
    case "limited":
      return "green";
    case "basic":
    default:
      return "amber";
  }
};

export const getDefaultRolePermissions = (roleType: string) => {
  switch (roleType) {
    case "admin":
      return {
        system: [true, true, true],
        business: [true, true, true]
      };
    case "manager":
      return {
        system: [true, true, false],
        business: [true, true, true]
      };
    case "staff":
      return {
        system: [false, false, false],
        business: [false, false, true]
      };
    default:
      return {
        system: [false, false, false],
        business: [false, false, false]
      };
  }
};
