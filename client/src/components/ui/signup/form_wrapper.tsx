import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  // each form in multistepForm
  children: ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h1 style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}>
        {title}
      </h1>
      <div
        style={{
          display: "grid",
          gap: "1rem .5rem",
          justifyContent: "flex-start",
          gridTemplateColumns: "auto minmax(auto, 400px)",
        }}
      >
        {children}
      </div>
    </>
  );
}
