"use client";

import ExportedImage from "next-image-export-optimizer";
import { useTheme } from "next-themes";
import { cubicBezier, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const YouOwnMoneySection = () => {
  const [isMounted, setIsMounted] = useState(false);
  // const { scrollYProgress } = useScroll();
  // const isLargeScreen = useMediaQuery("(min-width: 900px)");

  // const x = useTransform(
  //   scrollYProgress,
  //   [0, 1],
  //   [500, isLargeScreen ? -500 : -300],
  //   {
  //     ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  //   },
  // );
  // const y = useTransform(scrollYProgress, [0, 1], [0, 220], {
  //   ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  // });
  // const rotate = useTransform(scrollYProgress, [0, 1], [0, 40], {
  //   ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  // });

  // const rotateX = useTransform(scrollYProgress, [0, 1], [-120, 170], {
  //   ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  // });

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="md:mt-50 mx-8 mb-32 mt-32 flex flex-col items-center gap-20 md:mx-10 md:h-60 md:flex-row md:gap-32">
      <div className="flex flex-col gap-6">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold md:text-4xl"
        >
          Simple, secure transactions.
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-md text-muted-foreground"
        >
          We can&apos;t take your funds, they can only be{" "}
          <u>
            <a href="https://zk.email" style={{ textDecoration: "underline" }}>
              authorized by your email
            </a>
          </u>
          .
        </motion.p>
      </div>
      {/* <motion.div
        style={{ x, y, rotate, rotateX }}
        className="absolute -z-10 h-48 w-48 max-md:hidden md:-bottom-[170px] md:right-1/4"
      >
        <ExportedImage
          src={
            resolvedTheme === "dark"
              ? "/emailDarkMode.svg"
              : "/emailLightMode.svg"
          }
          alt={"email"}
          fill
        />
      </motion.div> */}

      {/* Small screen image */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0.5, x: 100 },
          visible: {
            opacity: 1,
            x: 0,
            rotateX: 180,
            rotate: 30,
          },
        }}
        viewport={{ amount: 0.8 }}
        transition={{ duration: 1 }}
        className={cn("relative h-40 w-40 md:self-end")}
      >
        <ExportedImage
          src={
            resolvedTheme === "dark"
              ? "/emailDarkMode.svg"
              : "/emailLightMode.svg"
          }
          alt={"email"}
          fill
        />
      </motion.div>
    </section>
  );
};

export default YouOwnMoneySection;
