export * from "./common/index.js";
export * from "./cards/index.js";

export default {
  fetch() {
    return new Response("Not Found", { status: 404 });
  },
};
