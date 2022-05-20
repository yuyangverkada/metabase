import { createErrorMessageMarkdown } from "metabase/lib/form";

describe("form", () => {
  describe("createErrorMessageMarkdown", () => {
    it("should return original message when it's not a string", () => {
      const errorMessage = undefined;
      expect(createErrorMessageMarkdown(errorMessage, undefined)).toBe(
        errorMessage,
      );
      expect(createErrorMessageMarkdown(errorMessage, [])).toBe(errorMessage);
      expect(
        createErrorMessageMarkdown(errorMessage, [
          {
            name: "details.port",
            title: "Port",
          },
        ]),
      ).toBe(errorMessage);
    });

    it("should return original string when no formFields is passed", () => {
      const errorMessage =
        "We couldn't connect to the SSH tunnel host. Check the Username and Password.";
      expect(createErrorMessageMarkdown(errorMessage, [])).toBe(errorMessage);
      expect(createErrorMessageMarkdown(errorMessage, undefined)).toBe(
        errorMessage,
      );
    });

    it("should return original string when no field matches", () => {
      const errorMessage =
        "We couldn't connect to the SSH tunnel host. Check the Username and Password.";
      expect(
        createErrorMessageMarkdown(errorMessage, [
          {
            name: "details.port",
            title: "Port",
          },
        ]),
      ).toBe(errorMessage);
    });

    it("should return bold field name when form fields match", () => {
      const errorMessage =
        "We couldn't connect to the SSH tunnel host. Check the Username and Password.";
      expect(
        createErrorMessageMarkdown(errorMessage, [
          {
            name: "details.port",
            title: "Port",
          },
          {
            name: "details.user",
            title: "Username",
          },
          {
            name: "details.password",
            title: "Password",
          },
        ]),
      ).toBe(
        "We couldn't connect to the SSH tunnel host. Check the **Username** and **Password**.",
      );
    });
  });
});
