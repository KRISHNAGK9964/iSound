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
export const Spinner = function Spinner(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );
};
export const HeaderSpline = function Spinner(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width="1442"
      height="210"
      viewBox="0 0 1442 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        id="modern-black"
        opacity="0.8"
        d="M1 121.94C1 121.94 124.5 106.984 179 106.984C233.5 106.984 234 136.897 270 136.897C315 136.897 351 145.871 412 106.984C473 68.0959 533.605 28.3229 585 35.6896C665 47.1565 749 193.733 836 207.693C935.795 223.706 946 87.0412 1070 101.001C1194 114.961 1166 132.909 1234 127.923C1302 122.938 1328 117.952 1358 115.958C1382 114.362 1422.67 115.293 1441 115.958"
        stroke="url(#paint0_linear)"
      />
      <path
        id="modern-yellow"
        opacity="0.8"
        d="M1441 114.672C1357 157.548 1247 94.668 1175 117.952C1138 129.918 1005 210.684 952 204.702C899 198.719 830 147.866 751 71.0874C687.8 9.66475 638 -1.03768 621 1.28893C603 1.62133 560 8.26881 488 64.1076C426.4 110.374 399 124.932 369 134.903C321.737 150.612 195.5 201.421 149 142.591C102.5 83.761 4 119.946 4 119.946"
        stroke="url(#paint1_linear)"
      />
      <path
        id="modern-gray"
        d="M2 120.944C2 120.944 195 122.5 219 120.944C243 119.387 267.716 110.972 283 110.972C323 110.972 341.191 134.27 359.5 148.574C408 186.465 446 86.7525 511 86.7525C576 86.7525 582.5 164.318 625 167.808C675 171.914 735 69.5918 776 69.5918C845.5 69.5918 873 159.831 929 155.843C985 151.854 1029 87.0414 1108 92.027C1187 97.0126 1242 114.961 1286 113.964C1321.2 113.166 1403 116.666 1441 118.66"
        stroke="url(#paint2_linear)"
        stroke-opacity="0.2"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="1441"
          y1="121.893"
          x2="1.03789"
          y2="136.006"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="0.111735" stop-color="white" />
          <stop offset="0.897073" stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="1441"
          y1="103"
          x2="4"
          y2="115"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="0.111735" stop-color="#F8D231" />
          <stop offset="0.897073" stop-color="#F8D231" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="1441"
          y1="118.756"
          x2="2.33269"
          y2="143.716"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="0.111735" stop-color="white" />
          <stop offset="0.897073" stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
      <animate
        href="#modern-black"
        attributeName="d"
        dur="6s"
        calcMode="spline"
        values="
    M1 121.94C1 121.94 124.5 106.984 179 106.984C233.5 106.984 234 136.897 270 136.897C315 136.897 351 145.871 412 106.984C473 68.0959 533.605 28.3229 585 35.6896C665 47.1565 749 193.733 836 207.693C935.795 223.706 946 87.0412 1070 101.001C1194 114.961 1166 132.909 1234 127.923C1302 122.938 1328 117.952 1358 115.958C1382 114.362 1422.67 115.293 1441 115.958;
    M1 120.941C1 120.941 124.5 130 179 130C233.5 130 234 118 270 118C315 118 351 171.888 412 133C473 94.1122 533.605 80.6334 585 88.0001C665 99.467 734.5 152.077 836 139.5C937.5 126.923 957.5 153.5 1070 136C1182.5 118.5 1166 105.986 1234 101C1302 96.0144 1328 137.994 1358 136C1382 134.405 1422.67 114.293 1441 114.958;
    M1 120.941C1 120.941 124.5 115 179 115C233.5 115 234 122.5 270 122.5C315 122.5 351 117.388 412 78.5002C473 39.6125 533.605 111.133 585 118.5C665 129.967 723.5 17.5001 836 14C948.5 10.4998 946 112.964 1070 126.923C1194 140.883 1166 106.486 1234 101.5C1302 96.5144 1323.5 114.958 1358 119C1392.5 123.042 1422.67 114.293 1441 114.958;
    M1 120.941C1 120.941 124.5 130 179 130C233.5 130 234 118 270 118C315 118 351 171.888 412 133C473 94.1122 533.605 80.6334 585 88.0001C665 99.467 734.5 152.077 836 139.5C937.5 126.923 957.5 153.5 1070 136C1182.5 118.5 1166 105.986 1234 101C1302 96.0144 1328 137.994 1358 136C1382 134.405 1422.67 114.293 1441 114.958;
    M1 121.94C1 121.94 124.5 106.984 179 106.984C233.5 106.984 234 136.897 270 136.897C315 136.897 351 145.871 412 106.984C473 68.0959 533.605 28.3229 585 35.6896C665 47.1565 749 193.733 836 207.693C935.795 223.706 946 87.0412 1070 101.001C1194 114.961 1166 132.909 1234 127.923C1302 122.938 1328 117.952 1358 115.958C1382 114.362 1422.67 115.293 1441 115.958;
    "
        keyTimes="0; 0.25; 0.5; 0.75; 1"
        keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
        repeatCount="indefinite"
      />
      <animate
        href="#modern-yellow"
        attributeName="d"
        dur="7s"
        calcMode="spline"
        values="
    M1441 114.672C1357 157.548 1247 94.668 1175 117.952C1138 129.918 1005 210.684 952 204.702C899 198.719 830 147.866 751 71.0874C687.8 9.66475 638 -1.03768 621 1.28893C603 1.62133 560 8.26881 488 64.1076C426.4 110.374 399 124.932 369 134.903C321.737 150.612 195.5 201.421 149 142.591C102.5 83.761 4 119.946 4 119.946;
    M1441 113.672C1349 116.5 1243.5 139.5 1175 139.5C1106.5 139.5 999 125 952 108C905 91.0002 824 21.5001 751 30.0001C678 38.5002 676.5 97.5001 621 100.5C565.5 103.5 531.5 65.5001 488 97.5001C444.5 129.5 405.5 144.5 369 154C332.5 163.5 212.5 153 149 128.5C85.5 104 4 118.946 4 118.946;
    M1441 113.672C1349 116.5 1215.5 94.5 1175 70.5C1134.5 46.5 1062.5 27.9999 952 23.9998C841.5 19.9998 824 65.9999 751 74.4999C678 83 676.5 55.4999 621 58.5C565.5 61.5001 534.5 125.053 488 122C441.5 118.946 412.5 106 369 89.4998C325.5 72.9998 215 86.4999 149 100.5C83 114.5 4 118.946 4 118.946;
    M1441 113.672C1349 116.5 1243.5 139.5 1175 139.5C1106.5 139.5 999 125 952 108C905 91.0002 824 21.5001 751 30.0001C678 38.5002 676.5 97.5001 621 100.5C565.5 103.5 531.5 65.5001 488 97.5001C444.5 129.5 405.5 144.5 369 154C332.5 163.5 212.5 153 149 128.5C85.5 104 4 118.946 4 118.946;
    M1441 114.672C1357 157.548 1247 94.668 1175 117.952C1138 129.918 1005 210.684 952 204.702C899 198.719 830 147.866 751 71.0874C687.8 9.66475 638 -1.03768 621 1.28893C603 1.62133 560 8.26881 488 64.1076C426.4 110.374 399 124.932 369 134.903C321.737 150.612 195.5 201.421 149 142.591C102.5 83.761 4 119.946 4 119.946;
    "
        keyTimes="0; 0.25; 0.5; 0.75; 1"
        keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
        repeatCount="indefinite"
      />
      <animate
        href="#modern-gray"
        attributeName="d"
        dur="5s"
        calcMode="spline"
        values="
    M2 120.944C2 120.944 195 122.5 219 120.944C243 119.387 267.716 110.972 283 110.972C323 110.972 341.191 134.27 359.5 148.574C408 186.465 446 86.7525 511 86.7525C576 86.7525 582.5 164.318 625 167.808C675 171.914 735 69.5918 776 69.5918C845.5 69.5918 873 159.831 929 155.843C985 151.854 1029 87.0414 1108 92.027C1187 97.0126 1242 114.961 1286 113.964C1321.2 113.166 1403 116.666 1441 118.66;
    M2 119.944C2 119.944 195.5 134 219 134C242.5 134 267.716 78 283 78C323 78 341.191 163.196 359.5 177.5C408 215.391 446 30 511 30C576 30 582.5 136.01 625 139.5C675 143.606 735 17 776 17C845.5 17 873 188.988 929 185C985 181.012 1029 58.5144 1108 63.5C1187 68.4856 1242 163.997 1286 163C1321.2 162.202 1403 115.666 1441 117.66;
    M2 119.943C2 119.943 195.5 157.5 219 157.5C242.5 157.5 262.5 96.5 283 62.9998C303.5 29.4996 341.191 17.6962 359.5 32C408 69.8906 446 157.5 511 157.5C576 157.5 582.5 9.51005 625 13C675 17.1058 735 112.964 776 112.964C845.5 112.964 873 66.9883 929 62.9998C985 59.0113 1029 142.588 1108 147.574C1187 152.56 1242 49.9971 1286 49C1321.2 48.2023 1403 115.666 1441 117.66;
    M2 119.944C2 119.944 195.5 134 219 134C242.5 134 267.716 78 283 78C323 78 341.191 163.196 359.5 177.5C408 215.391 446 30 511 30C576 30 582.5 136.01 625 139.5C675 143.606 735 17 776 17C845.5 17 873 188.988 929 185C985 181.012 1029 58.5144 1108 63.5C1187 68.4856 1242 163.997 1286 163C1321.2 162.202 1403 115.666 1441 117.66;
    M2 120.944C2 120.944 195 122.5 219 120.944C243 119.387 267.716 110.972 283 110.972C323 110.972 341.191 134.27 359.5 148.574C408 186.465 446 86.7525 511 86.7525C576 86.7525 582.5 164.318 625 167.808C675 171.914 735 69.5918 776 69.5918C845.5 69.5918 873 159.831 929 155.843C985 151.854 1029 87.0414 1108 92.027C1187 97.0126 1242 114.961 1286 113.964C1321.2 113.166 1403 116.666 1441 118.66;
    "
        keyTimes="0; 0.25; 0.5; 0.75; 1"
        keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
        repeatCount="indefinite"
      />
    </svg>
  );
};
