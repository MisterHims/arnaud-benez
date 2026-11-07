'use client';

import { CustomButton } from "@/components/CustomButton";
import { TextField, Label, Input, TextArea, FieldError, Surface } from "@heroui/react";
import { useTranslations } from "next-intl";
import React from "react";

export const ContactForm = () => {
  const t = useTranslations('Contact.form');
  // 1. Style du Label (au-dessus du champ)
  const labelClass = "text-base text-[#EDEDED] mb-1 block font-light";

  // 2. Style des Champs (Input & Textarea)
  // On applique tout directement ici : fond, bordure, arrondi, texte, etc.
  const fieldClass = "w-full bg-zinc-900/50 border border-3 border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 hover:border-white/20 transition-colors shadow-none";
  const [value, setValue] = React.useState("");

  return (
    <Surface className="w-full bg-transparent p-0 shadow-none">
      <form className="flex flex-col gap-6 w-full">

        {/* Ligne 1 : Nom & Email */}
        <div className="flex flex-col md:flex-row gap-6">

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
            <FieldError className="text-xs text-red-500 mt-1">
              {t('emailError')}
            </FieldError>
          </TextField>

        </div>

        {/* Ligne 2 : Message */}
        <TextField className="w-full" name="message">
          <Label className={labelClass}>{t('message')}</Label>
          <TextArea
            className={`${fieldClass} min-h-[150px] resize-none`}
            placeholder={t('messagePlaceholder')}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            style={{ resize: "vertical" }}
          />
        </TextField>

        {/* Footer du Formulaire */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mt-2">
          <div className="text-[#A0A0A0] text-base font-extralight leading-5.5">
            <span className="block mb-2 text-sm italic"><span className="text-red-500 mr-1">*</span>{t('required')}</span>
            <p>{t.rich('pitch', { br: () => <br /> })}</p>
          </div>
          <CustomButton
            type="submit"
            variant="primary"
            size="lg"
            className="w-full max-w-[200px]"
          >
            {t('submit')}
          </CustomButton>

        </div>

      </form>
    </Surface>
  );
};