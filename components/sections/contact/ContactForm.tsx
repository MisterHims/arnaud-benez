'use client';

import { CustomButton } from "@/components/CustomButton";
import { Button, TextField, Label, Input, TextArea, FieldError, Surface } from "@heroui/react";

export const ContactForm = () => {
  // 1. Style du Label (au-dessus du champ)
  const labelClass = "text-base text-[#EDEDED] mb-1 block font-light";

  // 2. Style des Champs (Input & Textarea)
  // On applique tout directement ici : fond, bordure, arrondi, texte, etc.
  const fieldClass = "w-full bg-zinc-900/50 border border-3 border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 hover:border-white/20 transition-colors shadow-none";

  return (
    <Surface className="w-full bg-transparent p-0 shadow-none">
      <form className="flex flex-col gap-6 w-full">

        {/* Ligne 1 : Nom & Email */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* CHAMP FULL NAME */}
          <TextField className="w-full" name="name">
            <Label className={labelClass}>Full Name</Label>
            <Input
              className={fieldClass}
              placeholder="John Doe"
            />
          </TextField>

          {/* CHAMP EMAIL */}
          <TextField className="w-full" name="email" type="email" isRequired>
            <Label className={labelClass}>
              Email
            </Label>
            <Input
              className={fieldClass}
              placeholder="john.doe@example.com"
            />
            <FieldError className="text-xs text-red-500 mt-1">
              Please enter a valid email address
            </FieldError>
          </TextField>

        </div>

        {/* Ligne 2 : Message */}
        <TextField className="w-full" name="message">
          <Label className={labelClass}>Your message</Label>
          <TextArea
            className={`${fieldClass} min-h-[150px] resize-none`}
          // placeholder="Hello..."
          />
        </TextField>

        {/* Footer du Formulaire */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-2">
          <div className="text-[#A0A0A0] text-base font-extralight leading-6">
            <span className="block mb-4"><span className="text-red-500 mr-1">*</span>Required</span>
            <p>Envie de discuter design, projets ou passions ?<br />
              On ne sait jamais ce qu'un simple message peut déclencher.</p>
          </div>
          <CustomButton variant="primary" size="lg">
            Envoyer
          </CustomButton>
          {/* <Button
            type="submit"
            size="lg"
            className="bg-white text-black font-bold rounded-full px-12 py-3 w-full md:w-auto hover:scale-105 transition-transform"
          >
            Envoyer
          </Button> */}
        </div>

      </form>
    </Surface>
  );
};