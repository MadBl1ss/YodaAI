"use client";

import { useRef } from "react";
import { useChat } from "ai/react";
import clsx from "clsx";
import { LoadingCircle, SendIcon, UserIcon } from "./icons";
import Textarea from "react-textarea-autosize";
import Image from "next/image";

const examples = [
  "What must a trader follow to achieve harmony?",
  "What brings strength to a hodler?",
  "The path to wisdom, what is it?",
];

export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    onResponse: (response) => {
      if (response.status === 429) {
        window.alert("You have reached your request limit for the day.");
        return;
      }
    },
  });

  const disabled = isLoading || input.length === 0;

  return (
    <main className="flex flex-col min-h-screen items-center justify-start relative">
      {/* Верхняя панель с иконками */}
      <div className="pt-5 w-full justify-center px-5 gap-10 flex">
      <a href="https://dexscreener.com/solana/8pb3s4kwfctrcvpcqfktgfblpfujst4byobcwsqqmoon" target="_blank">
        {/* <Image src="/pump-icon.png" alt="pump.fun" width={45} height={45}/> */}
        <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" width={45} height={45}>
          <path d="M62.6526 16.6167C63.4175 14.3625 60.5264 12.6934 58.9554 14.4793L56.155 17.6656C55.0196 18.958 53.5269 19.8853 51.8652 20.3306C50.2035 20.7758 48.4472 20.7191 46.8178 20.1675L42.7993 18.8083C40.5459 18.0472 38.8776 20.9418 40.6671 22.5116L43.8526 25.3081C45.1451 26.4433 46.0724 27.9359 46.5176 29.5974C46.9628 31.259 46.906 33.0152 46.3543 34.6446L44.9948 38.6628C44.23 40.917 47.1211 42.5861 48.6911 40.7966L51.4915 37.6103C52.6269 36.3179 54.1195 35.3906 55.7812 34.9453C57.4429 34.5001 59.1993 34.5568 60.8287 35.1084L64.8472 36.4676C67.1015 37.2323 68.7708 34.3413 66.9803 32.7679L63.7948 29.9714C62.5024 28.8362 61.5751 27.3436 61.1299 25.6821C60.6847 24.0205 60.7415 22.2643 61.2931 20.6349L62.6526 16.6167Z" fill="#DFFF16"></path>
          <path d="M69.8374 56.4306C70.6307 54.5406 68.3635 52.9306 66.4618 53.7706C62.6606 55.4392 58.5535 56.2974 54.4022 56.2906C38.127 56.2906 24.9358 43.364 24.9358 27.4157C24.9298 22.031 26.4597 16.7562 29.3458 12.2102C30.4503 10.468 29.1242 8.0569 27.1019 8.57023C11.5112 12.5485 0 26.4396 0 42.9635C0 62.5906 16.2363 78.5 36.2681 78.5C51.435 78.5 64.424 69.3806 69.8374 56.4306Z" fill="#DFFF16"></path>
          </svg>
        </a>
        <a href="https://x.com/0xYoda_sol" target="_blank">
          <Image src="/twitter.png" alt="X" width={45} height={45}/>
        </a>
      </div>

      {/* Контейнер с сообщениями (прокручиваемый) */}
        {messages.length > 0 ? (
          messages.map((message, i) => (
            <div
              key={i}
              className="flex w-full items-center justify-center py-4 bg-transparent"
            >
              <div className="flex w-full max-w-screen-md items-start space-x-4">
                <div
                  className={clsx(
                    message.role === "assistant"
                      ? "bg-white"
                      : "bg-accent p-1.5 text-white"
                  )}
                >
                  {message.role === "user" ? (
                    <UserIcon />
                  ) : (
                    <Image
                      src="/yoda_ai.jpg"
                      alt="Yoda AI"
                      width={36}
                      height={36}
                    />
                  )}
                </div>
                <div className="prose prose-p:leading-relaxed mt-1 w-full break-words text-white">
                  {message.content}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="border-accent mx-auto mt-6 max-w-screen-md w-full rounded-md border bg-transparent sm:w-full">
            <div className="flex flex-col space-y-4 p-7 sm:p-10">
              <Image src="/yoda_ai.jpg" alt="banner" height={100} width={200} className="animate-hue-rotate hidden sm:block"/>
              {/* <h1 className="text-lg font-bold text-accent">Hi, I'm Yoda AI</h1> */}
              <p className="text-accent font-medium">
              Enter the wisdom of Yoda AI, a guide from the stars to your questions and thoughts.
               Crafted with care to echo the insight of a Jedi Master,
                this AI offers clarity, wisdom, and a touch of mystique.
                 Ask, and the universe may reveal its answers through the voice of ancient knowledge
              </p>
              <p className="text-accent break-words">
                CA: 8PB3S4KWFctRcvpcqFKTgFbLpfUJSt4bYobcWsQQmoon
              </p>
            </div>
            <div className="flex flex-col space-y-4 border-t border-accent p-7 sm:p-10">
              {examples.map((example, i) => (
                <button
                  key={i}
                  className="rounded-md border border-accent bg-black px-5 py-3 text-accent transition-colors duration-300 hover:border-pinkneon hover:text-pinkneon"
                  onClick={() => {
                    setInput(example);
                    inputRef.current?.focus();
                  }}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="h-32"></div>

      {/* Фиксированная панель ввода внизу */}
      <div className="fixed bottom-0 w-full flex flex-col items-center space-y-3 p-5 pb-3 sm:px-0  backdrop-blur-sm border-t border-accent">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative w-full max-w-screen-md rounded-xl border border-accent bg-black text-white font-semibold px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4"
        >
          <Textarea
            ref={inputRef}
            required
            rows={1}
            autoFocus
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className="w-full pr-10 focus:outline-none text-white bg-transparent placeholder-white"
          />
          <button
            className={clsx(
              "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all",
              disabled
                ? "cursor-not-allowed"
                : "bg-accent hover:bg-blueneon"
            )}
            disabled={disabled}
          >
            {isLoading ? (
              <LoadingCircle />
            ) : (
              <SendIcon
                className={clsx(
                  "h-4 w-4",
                  input.length === 0 ? "text-gray-300" : "text-black"
                )}
              />
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
