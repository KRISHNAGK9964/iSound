import { SVGProps } from "react";
// import playICon from "./playIcon.svg";
// console.log(playICon);

function Package2Icon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 1-2 2H5a2 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 1 7.24 3h9.52a2 1.8 1.1L21" />
      <path d="M12 3v6" />
    </svg>
  );
}
export const PlayIcon = function PlayIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 100 100"
      xmlSpace="preserve"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M78.627,47.203L24.873,16.167c-1.082-0.625-2.227-0.625-3.311,0C20.478,16.793,20,17.948,20,19.199V81.27  c0,1.25,0.478,2.406,1.561,3.031c0.542,0.313,1.051,0.469,1.656,0.469c0.604,0,1.161-0.156,1.703-0.469l53.731-31.035  c1.083-0.625,1.738-1.781,1.738-3.031C80.389,48.984,79.71,47.829,78.627,47.203z" />
    </svg>
  );
};
export const PauseIcon = function PauseIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      viewBox="0 0 164 164"
      enableBackground="new 0 0 164 164"
      xmlSpace="preserve"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.445,154.801V9.52c0-12.266,34.15-12.266,34.15,0v145.281  C65.595,167.065,31.445,167.065,31.445,154.801L31.445,154.801z M98.084,154.801V9.52c0-12.266,34.151-12.266,34.151,0v145.281  C132.235,167.065,98.084,167.065,98.084,154.801z"
      />
    </svg>
  );
};
