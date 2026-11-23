import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HomePage } from "../src/pages/home";

describe("HomePage", () => {
  it("renders the service title and description", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText("Календарь звонков")).toBeInTheDocument();
    expect(
      screen.getByText(/Запишитесь на удобное время для звонка/)
    ).toBeInTheDocument();
  });

  it("has a call-to-action leading to the booking page", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const cta = screen.getByTestId("booking-cta");
    expect(cta).toBeInTheDocument();
    expect(cta.closest("a")).toHaveAttribute("href", "/booking");
    expect(cta).toHaveTextContent("Записаться на звонок");
  });

  it("has an admin link leading to the admin page", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const adminLink = screen.getByTestId("admin-link");
    expect(adminLink).toBeInTheDocument();
    expect(adminLink).toHaveAttribute("href", "/admin");
  });
});
