import BottomNav from "@/components/ui/bottom-nav";
import { Button } from "@/components/ui/button";
import {
  ErrorCallout,
  InfoCallout,
  SuccessCallout,
  WarningCallout,
} from "@/components/ui/callout";
import {
  DropdownIcon,
  EditIcon,
  InfoIcon,
  MarketIcon,
  MeIcon,
  MyTasksIcon,
} from "@/components/ui/icons";
import {
  DropdownInput,
  ParagraphInput,
  SingleLineInput,
} from "@/components/ui/inputs";

function ComponentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-3">
      <h1 className="largetitle w-full text-center text-penni-main">{title}</h1>
      {children}
    </div>
  );
}

export default function ComponentShowcase() {
  return (
    <div className="flex h-full w-screen items-center justify-center bg-penni-background-dark-mode">
      <div className="m-0 h-auto w-[375px] bg-penni-background-light-mode">
        <ComponentSection title="Typography">
          <h1 className="largetitle text-primary">Largetitle</h1>
          <h1 className="title1 text-primary">Title1</h1>
          <h2 className="title2 text-primary">Title2</h2>
          <h3 className="title3 text-primary">Title3</h3>
          <h3 className="headline text-primary">Headline</h3>
          <p className="body text-primary">Body</p>
          <p className="callout text-primary">Callout</p>
          <h3 className="subheadline-medium text-primary">
            Subheadline - Medium
          </h3>
          <h3 className="subheadline text-primary">Subheadline</h3>
          <p className="footnote text-primary">Footnote</p>
          <p className="caption-semibold text-primary">Caption - Semibold</p>
          <p className="caption text-primary">Caption</p>
          <p className="navigationlabel text-primary">Navigation Label</p>
        </ComponentSection>

        <ComponentSection title="Buttons">
          <Button>hello</Button>
          <Button variant="destructive">hello</Button>
          <Button variant="outline">hello</Button>
          <Button variant="secondary">hello</Button>
          <Button variant="ghost">hello</Button>
          <Button variant="link">hello</Button>
        </ComponentSection>

        <ComponentSection title="Callouts">
          <InfoCallout text="Info callout" />
          <InfoCallout text="Info callout" onClick={() => {}} />
          <SuccessCallout text="Success callout" />
          <WarningCallout text="Warning callout" />
          <ErrorCallout text="Error callout" />
        </ComponentSection>

        <ComponentSection title="Icons">
          <MeIcon />
          <MarketIcon />
          <MyTasksIcon />
          <EditIcon />
          <EditIcon strokeColour="penni-alert-warning" />
          <EditIcon strokeColour="penni-alert-error" />
          <InfoIcon />
          <DropdownIcon />
        </ComponentSection>

        <ComponentSection title="Inputs">
          <SingleLineInput
            label="Single line text"
            onChange={() => {}}
            value=""
            type="text"
          />
          <SingleLineInput
            label="Single line text"
            onChange={() => {}}
            value="with values filled in"
            type="text"
          />
          <SingleLineInput
            label="Single line price"
            onChange={() => {}}
            value=""
            type="price"
          />
          <SingleLineInput
            label="Single line date"
            onChange={() => {}}
            value=""
            type="date"
          />
          <SingleLineInput
            label="Single line password"
            onChange={() => {}}
            value=""
            type="password"
          />
          <ParagraphInput
            label="Paragraph"
            value="Some sample text here"
            onChange={() => {}}
          />
          <DropdownInput
            label="Dropdown"
            options={["hello", "yay"]}
            value="Some option"
            onChange={() => {}}
          />
        </ComponentSection>
      </div>
    </div>
  );
}
