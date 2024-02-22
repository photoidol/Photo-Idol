export const FEATURED_CATEGORY_REQ_LIMIT = 9;
export const POST_CARD_TITLE_TEXT_LIMIT = 20;
export const HOME_SETTING_OPT_ONE = "Home Slider";
export const HOME_SETTING_OPT_TWO = "Model";
export const HOME_SETTING_OPT_THREE = "Creatives";
export const CATEGORY_ADMIN = "admin";
export const CATEGORY_GUEST = "guest";
export const PHOTO_FEATURING_LIMIT = 10;
export const POST_LIKE_ADDED = "added";
export const POST_LIKE_REMOVED = "removed";
export const CATEGORY_HALF_BODY_PORTRAIT = "half body portrait";
export const CATEGORY_FULL_BODY_PORTRAIT = "full body portrait";
export const CATEGORY_LANDSCAPE = "landscape";

export const guidelinesData = [
  {
    id: CATEGORY_HALF_BODY_PORTRAIT,
    guidelines: [
      { desc: "The size must be between 0.5 MB and 80 MB." },
      { desc: "The accepted photo format are JPEG, PNG & JPG." },
      { desc: "The dimensions for the photo is: 50x50." },
    ],
  },
  {
    id: CATEGORY_FULL_BODY_PORTRAIT,
    guidelines: [
      { desc: "The size must be between 3 MB and 12 MB." },
      { desc: "The accepted photo format are JPEG, PNG & JPG." },
      { desc: "The dimensions for the photo is: 50x50." },
    ],
  },
  {
    id: CATEGORY_LANDSCAPE,
    guidelines: [
      { desc: "The size must be between 1 MB and 12 MB." },
      { desc: "The accepted photo format are JPEG, PNG & JPG." },
      { desc: "The dimensions for the photo is: 50x50." },
    ],
  },
];
