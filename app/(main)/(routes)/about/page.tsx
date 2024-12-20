//@ts-nocheck

"use client";

import { FaCoins } from "react-icons/fa";
import {
  MdCardTravel,
  MdOutlineCreditCard,
  MdOutlineNfc,
  MdWallet,
  MdWork,
} from "react-icons/md";
import { IoMdCodeWorking } from "react-icons/io";
import { TbDatabaseDollar } from "react-icons/tb";
import InfoGraphLg from "./_components/InfoGraghLg";
import InfoGraphSm from "./_components/InfoGraphSm";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { StarIcon } from "lucide-react";

const AboutPage = () => {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const timelineElementProps = (icon) => ({
    className: "vertical-timeline-element--work",
    iconStyle: {
      background: resolvedTheme === "dark" ? "#0f172a" : "#feead9",
      color: resolvedTheme === "dark" ? "white" : "gray",
    },
    contentStyle: {
      background: resolvedTheme === "dark" ? "#0f172a" : "#feead9",
      color: "#fff",
    },
    contentArrowStyle: {
      borderRight: `7px solid ${
        resolvedTheme === "dark" ? "#0f172a" : "#feead9"
      }`,
    },
    icon,
  });

  return (
    <section className="mx-auto flex max-w-screen-xl flex-col items-center gap-y-20 py-20">
      <h1 className="text-5xl font-semibold">About Us</h1>
      <p className="w-2/3 text-center text-muted-foreground">
        Email Wallet is an open source public good for a permissionless system
        by which anyone can onboard onto crypto via confirmation emails. Our
        goal is to make wallet infrastructure as easy as magic links, but
        maintain privacy and remain non-custodial.
        <br />
        <br />
        Each component including smart contracts and relayers are as
        decentralized as possible. Even if all of our infrastructure disappears
        tomorrow, you can still access your funds. We are grant funded by{" "}
        <a href="https://pse.dev" target="_blank" rel="noopener noreferrer">
          <u>EF PSE</u>
        </a>
        .
      </p>
      <div className="mx-auto flex flex-col items-center px-6">
        <h1 className="mb-8 w-[80%] text-center text-3xl font-semibold md:text-5xl md:leading-snug">
          Secured by Advanced Cryptography
        </h1>
        <h3 className="text-center text-muted-foreground">
          Secured by zero knowledge proofs on Ethereum. Powered by{" "}
          <a href="https://zk.email" target="_blank" rel="noopener noreferrer">
            <u>ZK Email</u>
          </a>
          . Decentralized and private by default.
        </h3>
        <InfoGraphLg />
        <InfoGraphSm />
      </div>
      <div className="mx-auto flex flex-col items-center px-6">
        <h1 className="mb-8 w-[80%] text-center text-3xl font-semibold md:text-5xl md:leading-snug">
          Story
        </h1>
        <VerticalTimeline
          lineColor={resolvedTheme === "dark" ? "white" : "darkgray"}
        >
          <VerticalTimelineElement
            {...timelineElementProps(<MdOutlineNfc />)}
            date="Feb 2024"
            dateClassName="text-primary"
          >
            <h3 className="text-lg font-semibold text-primary">
              Email Wallet Activation at Eth Denver
            </h3>
            <h4 className="mb-4 text-primary">Denver</h4>
            <span className="text-sm text-muted-foreground">
              Sora, Yush, Aditya, Saleel, and Wataru complete a 1-week
              activation at Eth Denver in which people can claim proof of
              location chip taps directly to their email wallets as NFTs. In
              partnership with{" "}
              <a
                href="https://cursive.team"
                target="_blank"
                rel="noopener noreferrer"
              >
                <u>Cursive</u>
              </a>{" "}
              and IYK.
            </span>
            <br />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            {...timelineElementProps(<MdWallet />)}
            date="Jan 2024"
            dateClassName="text-primary"
          >
            <h3 className="text-lg font-semibold text-primary">
              Account Recovery Begins
            </h3>
            <h4 className="mb-4 text-primary">Denver</h4>
            <span className="text-sm text-muted-foreground">
              Work begins on an account recovery module for account abstraction
              wallets via ZK Email proofs, with Clave and Soul.
            </span>
            <br />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            {...timelineElementProps(<FaCoins />)}
            date={"November 2023"}
            dateClassName="text-primary"
          >
            <h3 className="text-lg font-semibold text-primary">
              Email Wallet V1
            </h3>
            <h4 className="mb-4 text-primary">Istanbul, Turkey</h4>
            <span className="text-sm text-muted-foreground">
              Built by Sora, Yush, Saleel, Rasul, and Elo, a 2-week experiment
              for the decentralized email wallet V1 contracts is audited and
              deployed on Arbitrum Mainnet.
            </span>
            <br />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            {...timelineElementProps(<MdWork />)}
            date="May 2023"
            dateClassName="text-primary"
          >
            <h3 className="text-lg font-semibold text-primary">
              ZK Email SDKs and Email Wallet MVP Deployed
            </h3>
            <h4 className="mb-4 text-primary">Zuzalu/Tokyo/Vietnam</h4>
            <span className="text-sm text-muted-foreground">
              Sora and Yush, along with help from PSE and 0xPARC, finish MVPs of
              the circom + halo2 zk email SDK and the email wallet V0 without
              anonymity.
            </span>
            <br />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            {...timelineElementProps(<TbDatabaseDollar />)}
            date="December 2022"
            dateClassName="text-primary"
          >
            <h3 className="text-lg font-semibold text-primary">
              Email Wallet Invented
            </h3>
            <h4 className="mb-4 text-primary">IEEE Dubai</h4>
            <span className="text-sm text-muted-foreground">
              <a
                href="https://arxiv.org/abs/2312.04173"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sora Suegami&apos;s paper
              </a>{" "}
              describing a smart contract wallet controlled by emails is
              accepted to IEEE, based on his halo2 RSA circuits.
            </span>
            <br />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            {...timelineElementProps(<IoMdCodeWorking />)}
            date="Summer 2022"
            dateClassName="text-primary"
          >
            <h3 className="text-lg font-semibold text-primary">
              ZK Email Invented
            </h3>
            <h4 className="mb-4 text-primary">New York, NY</h4>
            <span className="text-sm text-muted-foreground">
              Sampriti Panda and Yush G create, compile, and run the first-ever
              zk-email circuit at the infamous New York 0xPARC residency.
            </span>
            <br />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
            icon={<StarIcon />}
          />
        </VerticalTimeline>
      </div>

      <div className="whats-next text-center">
        <div className="text-center">
          <h2 className="text-5xl font-semibold text-primary">
            What&apos;s Next?
          </h2>
        </div>
        <br />
        <div className="flex justify-center">
          <p className="w-2/3 text-center text-muted-foreground">
            Working on and auditing email gated OAuth for easy wallet login,
            account recovery for AA wallets, and supporting more{" "}
            <a
              href="https://zk.email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <u>zk email projects</u>
            </a>
            . Interested in asking questions, partnering, or beta testing? Reach
            out to us on{" "}
            <a
              href="https://t.me/zkemail"
              target="_blank"
              rel="noopener noreferrer"
            >
              <u>Telegram</u>
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
