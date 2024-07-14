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
import { Form } from "@/components/ui/form";
import {
  ChevronRightIcon,
  DropdownIcon,
  EditIcon,
  InboxIcon,
  InfoIcon,
  LogoutIcon,
  MarketIcon,
  MeIcon,
  MyTasksIcon,
  SettingsIcon,
} from "@/components/ui/icons";
import {
  DropdownInput,
  ParagraphInput,
  SingleLineInput,
} from "@/components/ui/inputs";
import PersonDetail from "@/components/ui/person-detail";
import ProfileTag from "@/components/ui/profile-tags";
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
          <Button
            size="penni" // Space for button variant / don't reference this in other pages, it's inner style!
            onClick={() => alert("test")}
          >
            Default
          </Button>
          {/* More Variants */}
          <Button size="sm" onClick={() => alert("test 2")}>
            Small Default
          </Button>
          <Button size="penni" variant="link" onClick={() => alert("test 3")}>
            Link
          </Button>
          <Button size="penni" variant="inactive" disabled={true}>
            Inactive
          </Button>
          <Button
            size="floating"
            variant="floating"
            onClick={() => alert("test 4")}
          >
            floating
          </Button>
          <Button size="pay" variant="pay" onClick={() => alert("test 5")}>
            Pay
          </Button>
          <Button size="finish" variant="finish">
            Finish
          </Button>
          <Button size="penni" variant="cutout" onClick={() => alert("test 6")}>
            Cutout
          </Button>
          <Button variant="cutout" size="sm" onClick={() => alert("test 7")}>
            Small Cutout
          </Button>
        </ComponentSection>

        <ComponentSection title="Callouts">
          {[
            <InfoCallout text="Info callout" />,
            <InfoCallout text="Info callout" onClick={() => {}} />,
            <SuccessCallout text="Success callout" />,
            <WarningCallout text="Warning callout" />,
            <ErrorCallout text="Error callout" />,
          ].map((callout, index) => {
            return (
              <div key={index} className="w-full px-4 py-3">
                {callout}
              </div>
            );
          })}
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
          <InboxIcon />
          <LogoutIcon />
          <SettingsIcon />
          <ChevronRightIcon />
        </ComponentSection>

        <ComponentSection title="Inputs">
          {[
            <SingleLineInput onChange={() => {}} value="" type="text" />,
            <SingleLineInput
              label="Single line text"
              onChange={() => {}}
              value=""
              type="text"
            />,
            <SingleLineInput
              label="Single line text"
              onChange={() => {}}
              value="with values filled in"
              type="text"
            />,
            <SingleLineInput
              label="Single line price"
              onChange={() => {}}
              value="100000000.00"
              type="price"
            />,
            <SingleLineInput
              label="Single line date"
              onChange={() => {}}
              value="2003-05-13"
              type="date"
            />,
            <SingleLineInput
              label="Single line password"
              onChange={() => {}}
              value="very secure password"
              type="password"
            />,
            <ParagraphInput
              label="Paragraph"
              value="Some sample text here"
              onChange={() => {}}
            />,
            <DropdownInput
              label="Dropdown"
              options={["hello", "yay"]}
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            />,
          ].map((input) => {
            return <div className="w-full px-4 pb-4">{input}</div>;
          })}
        </ComponentSection>

        <ComponentSection title="Form">
          <Form
            className="m-4"
            onSubmit={(dict) => {
              console.log(dict);
            }}
          >
            <h1 className="body-medium w-full text-penni-text-regular-light-mode">
              Player details
            </h1>
            <h2 className="subheadline w-full text-penni-text-secondary-light-mode">
              pspsps give us your data pspsps
            </h2>
            <SingleLineInput
              name="playerName"
              required={true}
              label="Your Name pls"
              type="text"
            />
            <ParagraphInput
              name="PlayerReason"
              label="Why did you chose to join us?"
              placeholder="Ever since I was little, I've always been passionate about not starving to death."
            />
            <h1 className="body-medium w-full text-penni-text-regular-light-mode">
              How much $$$ do you have??? :3
            </h1>
            <SingleLineInput value="1000" type="price" name="PlayerWallet" />
            <h1 className="body-medium w-full text-penni-text-regular-light-mode">
              At EA Games, we are very poor. Will you perchance consider making
              a small donation to a small indie game development company?
            </h1>
            <h2 className="subheadline w-full text-penni-text-secondary-light-mode">
              (...pls?)
            </h2>
            <DropdownInput // `name` not supplied so this input is ignored on submission
              value="Yes"
              onChange={() => {
                console.log("yes");
              }}
              options={["Yes", "Yes", "Yes"]}
              label="Thy answer"
            />
            <Button className="w-full" variant={"link"} type="button">
              Cancel
            </Button>
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </Form>
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
        <ComponentSection title="Profile Tags">
          <ProfileTag
            icon={InfoIcon}
            title="About"
            description="Lorem ipsum dolor sit amet."
            link="/profile/about"
          />
          <ProfileTag
            icon={LogoutIcon} // Pass the component directly
            title="Logout"
            description=""
            nestedContent={<div>Logout content goes here</div>} // Use nested content for Logout
          />
        </ComponentSection>
      </div>
    </div>
  );
}
