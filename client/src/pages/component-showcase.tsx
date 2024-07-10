import { useState } from "react";

import BottomNav from "@/components/ui/bottom-nav";
import { Button } from "@/components/ui/button";
import {
  ErrorCallout,
  InfoCallout,
  SuccessCallout,
  WarningCallout,
} from "@/components/ui/callout";
import { MarketDropdown } from "@/components/ui/dropdown";
import EmptyListDisplay from "@/components/ui/empty-list-display";
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
import PersonDetail from "@/components/ui/person-detail";
import TaskCard from "@/components/ui/task-card";
import TopNavtab from "@/components/ui/top-navtab";

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
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDropdown, setSelectedDropdown] = useState("HTML");
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
          <SingleLineInput onChange={() => {}} value="" type="text" />
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
            value="100000000.00"
            type="price"
          />
          <SingleLineInput
            label="Single line date"
            onChange={() => {}}
            value="2003-05-13"
            type="date"
          />
          <SingleLineInput
            label="Single line password"
            onChange={() => {}}
            value="very secure password"
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
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          />
        </ComponentSection>
        <ComponentSection title="Person Detail">
          <PersonDetail
            personName="very cool name"
            personImg="penni-logo.svg"
          />
        </ComponentSection>

        <ComponentSection title="Bottom Nav">
          <div className="w-full">
            <BottomNav isFixed={false} navIndex={0} />
          </div>
        </ComponentSection>

        <ComponentSection title="Top Navtab">
          <TopNavtab
            tabs={[
              {
                name: "Tab 1",
                content: <p>Tab 1 content</p>,
              },
              {
                name: "Tab 2",
                content: <p>Tab 2 content</p>,
              },
            ]}
          />
        </ComponentSection>
        <ComponentSection title="Task Card">
          <TaskCard
            title="Clean up my house"
            category="CLEANING"
            date="21 Aug, 2022"
            location="Richmond, VIC"
            duration="4"
            estimatePrice="300"
            myOfferPrice="250"
            state="ONGOING"
            priceType="Estimated Price"
          />
          <TaskCard
            title="Walking my dog"
            category="WALKING DOGS"
            date="21 Aug, 2022"
            location="Richmond, VIC"
            duration="4"
            estimatePrice="400"
            myOfferPrice="250"
            state="COMPLETED"
            priceType="My Offer"
          />
          <TaskCard
            title="Walking my dog"
            category="WALKING DOGS"
            date="21 Aug, 2022"
            location="Richmond, VIC"
            duration="4"
            estimatePrice="400"
            myOfferPrice="250"
            state="BIDDING"
            priceType="My Offer"
          />
          <TaskCard
            title="Walking my dog"
            category="WALKING DOGS"
            date="21 Aug, 2022"
            location="Richmond, VIC"
            duration="4"
            estimatePrice="400"
            myOfferPrice="250"
            state="EXPIRED"
            priceType="My Offer"
          />
          <TaskCard
            title="Clean up my house"
            category="CLEANING"
            date="21 Aug, 2022"
            location="Richmond, VIC"
            duration="5"
            estimatePrice="400"
            myOfferPrice="400"
            priceType="My Offer"
          />
        </ComponentSection>
        <ComponentSection title="Bidder-side">
          <MarketDropdown
            value={selectedDropdown}
            options={["C", "Python", "HTML"]}
            onChange={(e) => setSelectedDropdown(e.target.value)}
          />
          <EmptyListDisplay type="poster" />
        </ComponentSection>
      </div>
    </div>
  );
}
