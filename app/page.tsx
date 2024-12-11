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
        <a href="#" target="_blank">
          <Image src="/pump-icon.png" alt="pump.fun" width={45} height={45}/>
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
                CA: х
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
