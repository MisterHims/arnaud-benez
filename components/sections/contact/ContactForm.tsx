'use client';

import { CustomButton } from "@/components/CustomButton";
import { TextField, Label, Input, TextArea, FieldError, Surface } from "@heroui/react";
import { useTranslations } from "next-intl";
import React from "react";

export const ContactForm = () => {
  const t = useTranslations('Contact.form');
  // 1. Style du Label (au-dessus du champ)
  const labelClass = "text-base text-[#ebedf0] mb-1 block font-light";

  // 2. Style des Champs (Input & Textarea)
  // On applique tout directement ici : fond, bordure, arrondi, texte, etc.
  // Opaque fill (the color the former zinc-900/50 gave over the section),
  // so shooting stars pass behind the fields, not through them.
  // Focus: the gray border fades a little and a thin, soft white line lights
  // up inside it (3px gray, 1px white, then the field). HeroUI's own focus
  // ring (and, when invalid, its outline and offset ring) is removed with
  // !important (its selectors win otherwise); the inner
  // line is an inset ring, part of the same box-shadow stack
  const fieldClass = "w-full bg-[#121417] border border-3 border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#808790] focus:outline-none hover:border-white/20 focus:border-white/6 transition-[border-color,box-shadow] shadow-none! ring-0! ring-offset-0! outline-none! focus:inset-ring-1! focus:inset-ring-white/60! " +
    // Invalid: the same treatment in a muted red, no white/red clash
    "data-[invalid=true]:border-red-400/25 data-[invalid=true]:hover:border-red-400/35 data-[invalid=true]:focus:border-red-400/15 data-[invalid=true]:focus:inset-ring-red-300/60!";
  const [value, setValue] = React.useState("");

  return (
    <Surface className="w-full bg-transparent p-0 shadow-none">
      <form className="flex flex-col gap-6 w-full">

        {/* Ligne 1 : Nom & Email */}
        <div className="flex flex-col md:flex-row lg:max-xl:flex-col gap-6">

          {/* CHAMP FULL NAME */}
          <TextField className="w-full" name="name">
            <Label className={labelClass}>{t('name')}</Label>
            <Input
              className={fieldClass}
              placeholder={t('namePlaceholder')}
            />
          </TextField>

          {/* CHAMP EMAIL */}
          <TextField className="w-full" name="email" type="email" isRequired>
            <Label className={labelClass}>
              {t('email')}
            </Label>
            <Input
              className={fieldClass}
              placeholder={t('emailPlaceholder')}
            />
            <FieldError className="text-xs text-red-400 mt-1">
              {t('emailError')}
            </FieldError>
          </TextField>

        </div>

        {/* Ligne 2 : Message */}
        <TextField className="w-full" name="message">
          <Label className={labelClass}>{t('message')}</Label>
          <TextArea
            className={`${fieldClass} min-h-[150px] resize-grip`}
            placeholder={t('messagePlaceholder')}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            style={{ resize: "vertical" }}
          />
        </TextField>

        {/* Footer du Formulaire */}
        {/* 1024-1279px: "Required" top left, Send on its right; the pitch moves
            under the contact card (see Contact) */}
        <div className="flex flex-col md:flex-row items-stretch md:items-end lg:max-xl:items-start justify-between gap-6 mt-2">
          <div className="text-[#9aa1aa] text-base font-extralight leading-5.5">
            <span className="block mb-2 text-sm italic"><span className="text-red-400 mr-1">*</span>{t('required')}</span>
            <p className="lg:max-xl:hidden">{t.rich('pitch', { br: () => <br /> })}</p>
          </div>
          <CustomButton
            type="submit"
            variant="primary"
            size="lg"
            className="w-full md:max-w-[200px]"
          >
            {t('submit')}
          </CustomButton>

        </div>

      </form>
    </Surface>
  );
};