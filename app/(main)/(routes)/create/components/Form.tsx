"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

enum Currency {
  USDC,
  DAI,
  TEST,
}

const Form = () => {
  const [fromEmail, setFromEmail] = useState<string>("");
  const [toEmail, setToEmail] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [currency, setCurrency] = useState<Currency>(Currency.TEST);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef(null);

  function isValidEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,16}$/;
    return regex.test(email);
  }

  function getCurrencyOptionClass(selected: boolean): string {
    const baseClasses =
      "text-gray-700 block px-4 py-2 text-sm m-2 rounded-md cursor-pointer hover:transition-all";
    return selected
      ? `${baseClasses} bg-slate-100`
      : `${baseClasses} hover:bg-slate-100`;
  }

  function getEmailLink(
    email: string,
    subject: string,
    body: string,
  ): [string, string] {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      return [
        "Mail App",
        `mailto:${encodeURIComponent(
          "relayer@sendeth.org",
        )}?subject=${encodedSubject}&body=${encodedBody}`,
      ];
    }

    if (fromEmail.endsWith("@gmail.com")) {
      return [
        "Gmail",
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
          "relayer@sendeth.org",
        )}&su=${encodedSubject}&body=${encodedBody}`,
      ];
    } else if (
      fromEmail.endsWith("@outlook.com") ||
      fromEmail.endsWith("@hotmail.com")
    ) {
      return [
        "Outlook",
        `https://outlook.live.com/mail/0/compose?to=${encodeURIComponent(
          "relayer@sendeth.org",
        )}&subject=${encodedSubject}&body=${encodedBody}`,
      ];
    } else if (
      fromEmail.endsWith("@protonmail.com") ||
      fromEmail.endsWith("@proton.me") ||
      fromEmail.endsWith("@pm.me")
    ) {
      return [
        "Protonmail (manually copy-paste from below)",
        `https://mail.protonmail.com/compose?to=${encodeURIComponent(
          "relayer@sendeth.org",
        )}&subject=${encodedSubject}&body=${encodedBody}`,
      ];
    } else {
      // Default to mailto: if the domain is not recognized
      return [
        "Gmail",
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
          "relayer@sendeth.org",
        )}&su=${encodedSubject}&body=${encodedBody}`,
      ];
    }
  }

  const [emailProviderName, emailLink] = getEmailLink(
    fromEmail,
    `Send ${amount} ${Currency[currency]} to ${toEmail}`,
    "",
  );

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === "") {
      setAmount(undefined);
      return;
    }
    if (!Number.isInteger(Number(value))) {
      const roundedValue = Math.floor(Number(value));
      setAmount(roundedValue);
    } else {
      setAmount(Number(value));
    }
    if (Number(value) > 100 && currency === Currency.TEST) {
      setAmount(100);
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-1/2">
        <div className="mt-2 flex w-full items-start ">
          <input
            id="from_email"
            type="email"
            className="h-15 block w-full rounded-lg bg-secondary p-5 text-sm text-slate-700 invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none dark:text-primary"
            placeholder="Your email address"
            onChange={(e) => {
              setFromEmail(e.target.value);
            }}
            onBlur={(e) => {
              setFromEmail(e.target.value);
            }}
          />
        </div>

        {countdown ? (
          <div className="my-4 text-center">
            <p className="text-lg font-bold">
              If you don&apos;t see a confirmation, re-send in {countdown}{" "}
              seconds...
            </p>
          </div>
        ) : null}

        <a
          href={emailLink}
          target="_blank"
          onClick={() => {
            setEmailSent(true);
            setCountdown(60);
            const intervalId = setInterval(() => {
              setCountdown((prevCountdown) =>
                prevCountdown ? prevCountdown - 1 : null,
              );
            }, 1000);
            setTimeout(() => {
              clearInterval(intervalId);
              setCountdown(null);
            }, 60000);
          }}
          // Default hidden on large screens
          className={
            amount && amount > 0 && isValidEmail(toEmail)
              ? "flex h-12 w-full items-center justify-center gap-4 rounded-lg border border-blue-500 bg-green-500 bg-gradient-to-t from-blue-600 to-blue-500 px-4 py-2 text-white ease-in-out hover:scale-105 hover:transition-all sm:hidden sm:w-1/2"
              : "rounded-1/2 mt-2 flex h-12 w-full cursor-pointer items-center justify-center gap-4 rounded-lg border-[1px] border-[#3d4f7c] bg-gray-300 p-2 px-4 py-2 text-slate-50 hover:bg-[#3d4f7c] sm:hidden"
          }
        >
          {countdown ? `Failed? Re-send via Gmail` : `Send via Mail App`}
        </a>
        <a
          target="_blank"
          onClick={async () => {
            setEmailSent(true);
            setCountdown(60);
            const intervalId = setInterval(() => {
              setCountdown((prevCountdown) =>
                prevCountdown ? prevCountdown - 1 : null,
              );
            }, 1000);
            setTimeout(() => {
              clearInterval(intervalId);
              setCountdown(null);
            }, 60000);
            // Make a request to the endpoint
            try {
              const response = await fetch(
                `https://localhost:3000/api/onboard?data=${fromEmail}`,
              );
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              // Process the response if needed
            } catch (error) {
              console.error(
                "There has been a problem with your fetch operation:",
                error,
              );
            }
          }}
          // Default hidden in small screens
          className={
            amount && amount > 0 && isValidEmail(toEmail)
              ? "hidden h-12 w-full items-center justify-center gap-4 rounded-lg bg-green-500 bg-gradient-to-t from-blue-600 to-blue-500 px-4 py-2 text-white drop-shadow transition ease-in-out hover:scale-105 hover:transition-all sm:flex sm:w-1/2"
              : "rounded-1/2 mt-2 hidden h-12 w-full cursor-pointer items-center  justify-center gap-4 rounded-lg border-[1px] border-[#3d4f7c] p-2 px-4 py-2 text-slate-50 hover:bg-[#3d4f7c] sm:flex"
          }
        >
          {countdown
            ? `Failed? Re-send via default mail app:`
            : `Send via ${
                fromEmail.split("@")[1] ? fromEmail.split("@")[1] : "Gmail"
              }`}
        </a>

        {emailSent && (
          <div className="flex w-full items-start">
            <a
              href="https://mail.google.com/mail/u/0/#search/to%3Arelayer%40sendeth.org"
              target="_blank"
              className="flex h-12 w-full items-center justify-center gap-4 rounded-lg bg-gradient-to-t from-tertiary to-tertiary-foreground px-4 py-2 text-primary drop-shadow transition ease-in-out hover:scale-105 hover:transition-all dark:text-primary-foreground"
            >
              View Sent Email
            </a>
          </div>
        )}

        {amount && amount > 0 && isValidEmail(toEmail) && (
          <div className="mt-4 flex flex-col items-start gap-2 rounded-md bg-slate-100 p-4">
            <div className="flex">
              <span className="text-slate-500">To:</span>
              <span className="ml-2 text-left text-slate-700">
                relayer@sendeth.org
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("relayer@sendeth.org");
                  document
                    .getElementById("copyIcon1")
                    ?.setAttribute("src", "https://i.imgur.com/17wupld.png");
                }}
              >
                <img
                  id="copyIcon1"
                  src="https://i.imgur.com/yTOO12l.png"
                  alt="Copy to clipboard"
                  style={{ height: "1em", marginLeft: "0.5em" }}
                />
              </button>
            </div>
            <div className="flex">
              <span className="text-slate-500">Subject:</span>
              <span className="ml-2 text-left text-slate-700">{`Send ${amount} ${Currency[currency]} to ${toEmail}`}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Send ${amount} ${Currency[currency]} to ${toEmail}`,
                  );
                  document
                    .getElementById("copyIcon2")
                    ?.setAttribute("src", "https://i.imgur.com/17wupld.png");
                }}
              >
                <img
                  id="copyIcon2"
                  src="https://i.imgur.com/yTOO12l.png"
                  alt="Copy to clipboard"
                  style={{ height: "1em", marginLeft: "0.5em" }}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;