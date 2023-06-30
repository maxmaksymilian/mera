export type FormMessageProps = {
  children: React.ReactNode;
  success: boolean;
};

export const FormMessage = ({ children, success }: FormMessageProps) => (
  <div
    className={`w-full rounded-xs bg-opacity-20 py-8 px-6 ${
      success ? 'bg-success' : 'bg-error'
    }`}
  >
    {children}
  </div>
);
