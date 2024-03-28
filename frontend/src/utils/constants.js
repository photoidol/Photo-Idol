export const FEATURED_CATEGORY_REQ_LIMIT = 9;
export const POST_CARD_TITLE_TEXT_LIMIT = 20;
export const HOME_SETTING_OPT_ONE = "Home Slider";
export const HOME_SETTING_OPT_TWO = "Model";
export const HOME_SETTING_OPT_THREE = "Creatives";
export const CATEGORY_ADMIN = "admin";
export const CATEGORY_GUEST = "guest";
export const PHOTO_FEATURING_LIMIT = 15;
export const POST_LIKE_ADDED = "added";
export const POST_LIKE_REMOVED = "removed";
export const CATEGORY_HALF_BODY_PORTRAIT = "half body portrait";
export const CATEGORY_FULL_BODY_PORTRAIT = "full body portrait";
export const CATEGORY_LANDSCAPE = "landscape";
export const LOAD_MORE_POST_COUNT = 5;

export const guidelinesData = [
  {
    id: CATEGORY_HALF_BODY_PORTRAIT,
    title: "Half Body Portrait",
    guidelines: [
      { desc: "Image size must not exceed 3 MB." },
      { desc: "Accepted formats include JPEG, JPG, and PNG." },
      {
        desc: "Dimensions: Please ensure the photo dimensions are suitable for half body portraits.",
      },
      {
        desc: "Resolution: Please ensure the resolution is appropriate for clear viewing.",
      },
    ],
  },
  {
    id: CATEGORY_FULL_BODY_PORTRAIT,
    title: "Full Body Portrait",
    guidelines: [
      { desc: "Image size must not exceed 3 MB." },
      { desc: "Accepted formats: JPEG, PNG, JPG." },
      {
        desc: "Dimensions: Please ensure the photo dimensions are appropriate for full body portraits.",
      },
      {
        desc: "Resolution: Provide the highest quality possible without exceeding file size limits.",
      },
    ],
  },
  {
    id: CATEGORY_LANDSCAPE,
    title: "Landscape",
    guidelines: [
      { desc: "Image size must not exceed 3 MB." },
      { desc: "Accepted formats include JPEG, JPG, and PNG." },
      {
        desc: "Dimensions: Please ensure the photo dimensions are suitable for landscape orientation.",
      },
      {
        desc: "Resolution: Provide the highest quality possible without exceeding file size limits.",
      },
    ],
  },
];
