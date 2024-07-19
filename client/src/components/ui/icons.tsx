export function EditIcon({
  strokeColour = "penni-text-regular-light-mode",
}: {
  strokeColour?: string;
}) {
  return (
    <svg
      className={`size-6 fill-none stroke-${strokeColour}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
        stroke="current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 2.49998C18.8978 2.10216 19.4374 1.87866 20 1.87866C20.5626 1.87866 21.1022 2.10216 21.5 2.49998C21.8978 2.89781 22.1213 3.43737 22.1213 3.99998C22.1213 4.56259 21.8978 5.10216 21.5 5.49998L12 15L8 16L9 12L18.5 2.49998Z"
        stroke="current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InfoIcon({
  strokeColour = "penni-text-regular-light-mode",
}: {
  strokeColour?: string;
}) {
  return (
    <svg
      className={`size-6 fill-none stroke-${strokeColour}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v4M12 16h.01"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DropdownIcon({
  strokeColour = "penni-text-regular-light-mode",
}: {
  strokeColour?: string;
}) {
  return (
    <svg
      className={`fill-none stroke-${strokeColour}`}
      width={14}
      height={9}
      viewBox="0 0 14 9"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1.5l6 6 6-6"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon({
  //Phone Icon used in help page
  strokeColour = "penni-text-regular-light-mode",
}: {
  strokeColour?: string;
}) {
  return (
    <svg
      className={`fill-none pr-[0.1rem] pt-[0.1rem] stroke-${strokeColour}`}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23 7V1H17"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 8L23 1"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4741 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4018C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.945 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3146 6.72533 15.2661 5.18999 12.85C3.49997 10.2412 2.44824 7.27097 2.11999 4.17997C2.095 3.90344 2.12787 3.62474 2.21649 3.3616C2.30512 3.09846 2.44756 2.85666 2.63476 2.6516C2.82196 2.44653 3.0498 2.28268 3.30379 2.1705C3.55777 2.05831 3.83233 2.00024 4.10999 1.99997H7.10999C7.5953 1.9952 8.06579 2.16705 8.43376 2.48351C8.80173 2.79996 9.04207 3.23942 9.10999 3.71997C9.23662 4.68004 9.47144 5.6227 9.80999 6.52997C9.94454 6.8879 9.97366 7.27689 9.8939 7.65086C9.81415 8.02482 9.62886 8.36809 9.35999 8.63998L8.08999 9.90997C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5285 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Bottom navBar icons */
interface BottomNavIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string; // use to change color of the svg pic
  alt?: string;
}
const MyTasksIcon: React.FC<BottomNavIconProps> = ({ className, ...props }) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const MarketIcon: React.FC<BottomNavIconProps> = ({ className, ...props }) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 3H3v7h7V3zM21 3h-7v7h7V3zM21 14h-7v7h7v-7zM10 14H3v7h7v-7z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const MeIcon: React.FC<BottomNavIconProps> = ({ className, ...props }) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { MarketIcon, MeIcon, MyTasksIcon };

/* Profile Page icons */
interface ProfilePageIcons extends React.SVGProps<SVGSVGElement> {
  className?: string; // use to change color of the svg pic
  alt?: string;
}
const ChevronRightIcon: React.FC<BottomNavIconProps> = ({
  className = "text-penni-alert-warning",
  ...props
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="#0B1920"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const LogoutIcon: React.FC<BottomNavIconProps> = ({
  className = "text-penni-alert-warning",
  ...props
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
        stroke="#0B1920"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 17L21 12L16 7"
        stroke="#0B1920"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12H9"
        stroke="#0B1920"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const SettingsIcon: React.FC<BottomNavIconProps> = ({
  className = "text-penni-alert-warning",
  ...props
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_8084_947)">
        <path
          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
          stroke="#0B1920"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15V15Z"
          stroke="#0B1920"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_8084_947">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const InboxIcon: React.FC<BottomNavIconProps> = ({
  className = "text-penni-alert-warning",
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 12H16L14 15H10L8 12H2"
        stroke="#0B1920"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11V5.11Z"
        stroke="#0B1920"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

function PenniLogoIcon() {
  return (
    <svg
      width={87}
      height={86}
      viewBox="0 0 87 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path fill="url(#pattern0_6363_21091)" d="M0.5 0H86.5V86H0.5z" />
      <defs>
        <pattern
          id="pattern0_6363_21091"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use
            xlinkHref="#image0_6363_21091"
            transform="matrix(.00168 0 0 .00168 -.097 0)"
          />
        </pattern>
        <image
          id="image0_6363_21091"
          width={712}
          height={596}
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

export { ChevronRightIcon, InboxIcon, LogoutIcon, PenniLogoIcon,SettingsIcon };
