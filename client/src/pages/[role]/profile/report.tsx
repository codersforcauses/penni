import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import WriteIn, { WriteInFormData } from "@/components/ui/write-in";

/**
 * The Report component allows users to report a problem by filling out a form with a subject, description, and optional images.
 *
 * @returns {JSX.Element} The Report component.
 */
export default function Report() {
  const [formReady, setFormReady] = useState(false);
  const [formData, setFormData] = useState<WriteInFormData>({
    subject: "",
    description: "",
    imgs: [],
  });
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [remainingHeight, setRemainingHeight] = useState(0);
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);

      setRemainingHeight(window.innerHeight - headerHeight);
    }
  }, [headerHeight]);

  const handleFormDataChange = (data: WriteInFormData) => {
    setFormData(data);
    const formState =
      data.subject.trim() !== "" && data.description.trim() !== "";
    setFormReady(formState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formReady) {
      console.log("SUBMIT FORM:", formData);
      // Send submission to server....
    }
  };

  return (
    <div id="report" className="h-screen bg-penni-grey-border-light-mode">
      <div ref={headerRef} className="pb-3">
        <Header title="Report a problem" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between"
        style={{ height: remainingHeight }}
      >
        <WriteIn
          imgUpload={true}
          onFormDataChange={handleFormDataChange}
          maxImgs={5}
        />

        <div className="flex items-center justify-center rounded-t-2xl bg-penni-background-light-mode p-4 shadow-md">
          <Button
            type="submit"
            disabled={!formReady}
            variant="floating"
            size="penni"
          >
            Submit report
          </Button>
        </div>
      </form>
    </div>
  );
}
