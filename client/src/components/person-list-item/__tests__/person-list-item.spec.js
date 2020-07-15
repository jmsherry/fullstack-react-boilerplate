import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import PersonListItem from "./../person-list-item";

test("renders correctly", () => {
  const fakePersonData = {
    firstName: "James",
    lastName: "Sherry",
    email: "james.sherry@thejump.tech",
  };
  const { getByText, container } = render(
    <PersonListItem item={fakePersonData} />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <li
      class="makeStyles-item-1"
    >
      <div
        class="makeStyles-display-2"
      >
        James Sherry (
        <a
          href="mailto:james.sherry@thejump.tech"
        >
          james.sherry@thejump.tech
        </a>
        )
      </div>
      <div>
        <button
          aria-label="update todo"
          class="MuiButtonBase-root MuiButton-root MuiButton-text"
          tabindex="0"
          type="button"
        >
          <span
            class="MuiButton-label"
          >
            <svg
              aria-hidden="true"
              class="MuiSvgIcon-root"
              focusable="false"
              viewBox="0 0 24 24"
            >
              <path
                d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
              />
            </svg>
          </span>
          <span
            class="MuiTouchRipple-root"
          />
        </button>
        <button
          aria-label="delete todo"
          class="MuiButtonBase-root MuiButton-root MuiButton-text"
          tabindex="0"
          type="button"
        >
          <span
            class="MuiButton-label"
          >
            <svg
              aria-hidden="true"
              class="MuiSvgIcon-root"
              focusable="false"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
              />
            </svg>
          </span>
          <span
            class="MuiTouchRipple-root"
          />
        </button>
      </div>
    </li>
  `);
});
