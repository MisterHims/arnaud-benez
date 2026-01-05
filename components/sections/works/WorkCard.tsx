'use client';

import { Card, CloseButton } from "@heroui/react";
import { CustomButton } from "@/components/CustomButton";
import Image from 'next/image';

interface WorkCardProps {
  title: string;
  category?: string;
  imageSrc?: string;
  logo?: string;
  className?: string;
}

export const WorkCard = ({
  title,
  category,
  imageSrc,
  logo,
  className,
}: WorkCardProps) => {

  return (
    <Card className="w-full items-stretch md:flex-row">
      <div className="relative shrink-0 overflow-hidden rounded-2xl h-[240px] w-[240px]">
        <Image
          src={"/assets/works/heroui.jpg"}
          alt={title}
          width={240}
          height={120}
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <Card.Header className="gap-1">
          <Card.Title className="pr-8">{title}</Card.Title>
          <Card.Description>
            {category}
          </Card.Description>
          <CloseButton aria-label="Close banner" className="absolute top-3 right-3" />
        </Card.Header>
        <Card.Footer className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">Only 10 spots</span>
            <span className="text-xs text-muted">Submission ends Oct 10.</span>
          </div>
          <CustomButton className="w-full sm:w-auto">Apply Now</CustomButton>
        </Card.Footer>
      </div>
    </Card>
  );
};