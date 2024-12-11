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
    <main className="flex flex-col items-center justify-start min-h-screen relative">
      {/* Верхняя панель с иконками */}
      <div className="pt-5 w-full justify-center px-5 gap-10 flex">
        <a href="#" target="_blank">
          <Image src="/pump-icon.png" alt="pump.fun" width={45} height={45}/>
        </a>
        <a href="https://x.com/Yoda_AI_Sol" target="_blank">
          <Image src="/twitter.png" alt="X" width={45} height={45}/>
        </a>
      </div>

      {/* Контейнер с сообщениями (прокручиваемый) */}
      <div className="flex-1 w-full max-w-screen-md px-5 sm:px-0 overflow-auto">
        {messages.length > 0 ? (
          messages.map((message, i) => (
            <div
              key={i}
              className="flex w-full items-center justify-center py-8 bg-transparent"
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
          <div className="border-accent mx-auto mt-6 max-w-screen-md w-full rounded-md border bg-transparent">
            <div className="flex flex-col space-y-4 p-7 sm:p-10">
              <Image src="/yoda_ai.jpg" alt="banner" height={100} width={200} className="animate-hue-rotate"/>
              <h1 className="text-lg font-bold text-accent">Hi, I'm Yoda AI</h1>
              <p className="text-accent font-medium">
                Meet the AI with the wisdom of a galaxy far, far away. Yoda AI provides thoughtful responses, cryptic insights,
                and Jedi-like guidance. Ask your question, and uncover the mysteries of the universe through the voice of a true Jedi master.
              </p>
              <p className="text-accent break-words">
                CA: xxxxxxxxxxxxx
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
      </div>

      {/* Фиксированная панель ввода внизу */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center p-5 pb-3 bg-black/50 backdrop-blur-sm border-t border-accent">
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
