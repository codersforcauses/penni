import {
  ErrorCallout,
  InfoCallout,
  SuccessCallout,
  WarningCallout,
} from "@/components/ui/callout";

export default function Test() {
  return (
    <>
      <WarningCallout text="This is a warning" />
      <InfoCallout
        text="I do stuff when u click me!"
        onClick={() => {
          console.log("a");
        }}
      />
      <SuccessCallout text="This is a success" />
      <ErrorCallout text="This is an error" />
    </>
  );
}
