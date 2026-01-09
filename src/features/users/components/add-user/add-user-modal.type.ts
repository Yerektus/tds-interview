export type UserFormValues = {
    firstname: string;
    lastname: string;
    email: string;
    skills: { value: string }[];
};

export interface AddUserModalProps {
    isOpen: boolean;
    onClose: (needRefresh?: boolean) => void;
}
