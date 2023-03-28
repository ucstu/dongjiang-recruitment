import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import CompanyLocation from "./CompanyLocation.vue";

describe("CompanyLocation", () => {
  test("renders", async () => {
    expect(CompanyLocation).toBeTruthy();
    const wrapper = mount(CompanyLocation);
    const san = wrapper.get("div");
    expect(san.text()).toBe("empty");
    await flushPromises();
  });
});
