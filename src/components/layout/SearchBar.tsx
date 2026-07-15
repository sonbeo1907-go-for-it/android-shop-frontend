"use client";

import {
  useEffect,
  useId,
  useState,
  type FormEvent,
} from "react";
import { Search, X } from "lucide-react";

import { IconButton } from "@/components/ui";
import { cn } from "@/utils/cn";

export type SearchBarProps = {
  defaultValue?: string;
  placeholder?: string;
  compact?: boolean;
  className?: string;
  onSearch: (keyword: string) => void;
};

export function SearchBar({
  defaultValue = "",
  placeholder = "Bạn cần tìm điện thoại nào?",
  compact = false,
  className,
  onSearch,
}: SearchBarProps) {
  const inputId = useId();
  const [keyword, setKeyword] = useState(defaultValue);

  useEffect(() => {
    setKeyword(defaultValue);
  }, [defaultValue]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedKeyword = keyword.trim();

    if (!normalizedKeyword) {
      return;
    }

    onSearch(normalizedKeyword);
  }

  return (
    <form
      role="search"
      className={cn("relative w-full", className)}
      onSubmit={handleSubmit}
    >
      <label htmlFor={inputId} className="sr-only">
        Tìm kiếm sản phẩm
      </label>

      <Search
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400",
          compact ? "size-4" : "size-5",
        )}
      />

      <input
        id={inputId}
        type="search"
        value={keyword}
        placeholder={placeholder}
        autoComplete="off"
        className={cn(
          "w-full rounded-button border border-white/20 bg-white text-foreground shadow-sm outline-none transition",
          "placeholder:text-slate-400 focus:border-white focus:ring-4 focus:ring-white/20",
          compact
            ? "h-10 pl-9 pr-10 text-sm"
            : "h-11 pl-10 pr-12 text-sm sm:h-12",
        )}
        onChange={(event) => {
          setKeyword(event.target.value);
        }}
      />

      {keyword && (
        <IconButton
          type="button"
          icon={<X aria-hidden="true" className="size-4" />}
          label="Xóa từ khóa tìm kiếm"
          variant="ghost"
          size="sm"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-500 hover:bg-slate-100"
          onClick={() => {
            setKeyword("");
          }}
        />
      )}
    </form>
  );
}
