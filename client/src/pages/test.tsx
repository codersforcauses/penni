import {
  ErrorCallout,
  InfoCallout,
  SuccessCallout,
  WarningCallout,
} from "@/components/ui/callout";

export default function Test() {
  return (
    <>
      <ErrorCallout text="Hwldwadwadawdadwdwdlo!" />
      <SuccessCallout text="Hwllo!" />
      <InfoCallout text="Hwllo!" />
      <WarningCallout text="Hwllo!" />
    </>
  );
}
