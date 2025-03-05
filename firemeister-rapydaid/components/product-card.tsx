import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price }) => {
  return (
    <Card className="border rounded-lg shadow-md p-4">
      <Image
        src={image}
        alt={title}
        width={320}
        height={320}
        className="w-full rounded-md bg-cover"
      />
      <div className="mt-3">
        <h2 className="text-sm font-medium text-gray-800">{title}</h2>
        <p className="text-lg font-semibold text-gray-900 mt-1">{price}</p>
      </div>
    </Card>
  );
};

interface ProductGridProps {
  products: { image: string; title: string; price: string }[];
  title: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  return (
    <div className="my-8">
      <h2 className="text-lg font-bold text-gray-800 mb-4">{title}</h2>
      <div className="flex gap-6 justify-center mx-auto">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default function ProductPage() {
  const latestDrops = [
    {
      image: "/headphones.webp",
      title: "Audio Arrogance AuralElite",
      price: "$249.00",
    },
    {
      image: "/bag.webp",
      title: "Pinnacle Posh Pack",
      price: "$405.00",
    },
    {
      image: "/turntable.webp",
      title: "Vinyl Virtuoso Opulenza",
      price: "$699.00",
    },
  ];

  const weeklyPicks = [
    {
      image: "/hoodie.webp",
      title: "Explorer Adventure Jacket",
      price: "$129.00",
    },
    {
      image: "/watch.webp",
      title: "Traveler Backpack Pro",
      price: "$189.00",
    },
    {
      image: "/lamp.webp",
      title: "Modern Desk Lamp",
      price: "$79.00",
    },
  ];

  return (
    <div className="flex flex-col text-justify mx-auto container max-w-5xl gap-10 pb-20">
      <ProductGrid title="Latest Drops" products={latestDrops} />
      <ProductGrid title="Weekly Picks" products={weeklyPicks} />
    </div>
  );
}
