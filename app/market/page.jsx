"use client";

import React from "react";
import { Input, Card, CardBody, CardFooter, Image, Button, User } from "@nextui-org/react";

const list = [
  {
    title: "Orange",
    img: "https://media.istockphoto.com/id/1131608539/photo/a-lot-of-oranges-with-some-cut-in-half-and-leaves.jpg?s=612x612&w=is&k=20&c=Mb4OCaLQ5JMaLPbPjcMfBxiYIUmXc4KBEMf5CRoqKvs=",
    price: "$5.50",
  },
  {
    title: "Raspberry",
    img: "https://media.istockphoto.com/id/1263891766/photo/collection-of-fresh-red-raspberries.jpg?s=1024x1024&w=is&k=20&c=fIHUupGt8I15pf40owhuD6Cgn302u2TBktLfLOKiEbY=",
    price: "$10.00",
  },
  {
    title: "Lemon",
    img: "https://media.istockphoto.com/id/1404188749/photo/lemons-in-the-lemon-tree.jpg?s=612x612&w=is&k=20&c=aIKVvTwSQhcI0zI2-iZnw9OMgnr-s62ZaKYQPGotrxw=",
    price: "$5.30",
  },
  {
    title: "Avocado",
    img: "https://media.istockphoto.com/id/1332477907/photo/fresh-organic-avocado-at-farmers-market-healthy-food.jpg?s=612x612&w=is&k=20&c=EB3KfFfcjW7SsF6byZLeFvNkCkXFrDF92YITmH6w09E=",
    price: "$15.70",
  },
  {
    title: "Banana",
    img: "https://media.istockphoto.com/id/1350708696/photo/colombian-fruits-and-vegetables.jpg?s=612x612&w=is&k=20&c=3WRmDfNnj9Z9tkJR71jwpON5F3x0gNGEaXXQuv4fvd8=",
    price: "$7.50",
  },
  {
    title: "Watermelon",
    img: "https://media.istockphoto.com/id/938827438/photo/bulk-watermelons-from-a-street-market.jpg?s=612x612&w=is&k=20&c=OD0rT0uOBD9WlwnSc625lGcKT1KVoBS1WqLOxKS6Cnc=",
    price: "$12.20",
  },
];

const Market = () => {
  return (
    <div className="min-h-screen flex flex-col items-center h-screen overflow-y-scroll">
      <div className="w-full max-w-4xl p-6 pt-4 md:w-[500px] mb-36">
        <div className="relative text-white">
          <h1 className="text-center text-lg md:text-xl font-semibold mb-5">Market</h1>
          <div className="absolute top-0 left-0 flex items-center gap-3">
            <i className="bx bxs-cart-alt text-xl p-1 bg-white/10 rounded"></i>
          </div>
        </div>

        <Input
          clearable
          fullWidth
          type="search"
          placeholder="Search to buy..."
          required
          className="mb-6"
          classNames={{
            label: "text-gray-300",
            input: [
              "bg-transparent",
              "text-white/90",
              "placeholder:text-white/100",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "text-white",
              "bg-default-200/50",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "group-data-[focus=true]:bg-default-200/50",
              "!cursor-text",
            ],
          }}
        />

        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-8">
          <Button className="text-sm py-2 px-4" shadow color="primary" auto>
            Sell Your Items
          </Button>
          <Button className="text-sm py-2 px-4" shadow color="primary" auto>
            Bazar Price Updates
          </Button>
        </div>

        <h2 className="text-lg text-white mb-4">My Listed:</h2>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {list.slice(0, 3).map((item, index) => (
            <Card
              key={index}
              className="bg-white/20 backdrop-blur-md border border-gray-300 shadow-xl"
              isPressable
              onPress={() => console.log("item pressed")}
            >
              <CardBody className="p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="object-cover h-[140px]"
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="justify-between p-4">
                <b className="text-white">{item.title}</b>
                <p className="text-white/80">{item.price}</p>
              </CardFooter>
            </Card>
          ))}
        </div>

        <h2 className="text-lg text-white mt-8 mb-4">Top Sells:</h2>
        <div className="gap-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
          {list.map((item, index) => (
            <Card
              key={index}
              className="bg-white/20 backdrop-blur-md border border-gray-300 shadow-xl"
              isPressable
              onPress={() => console.log("item pressed")}
            >
              <CardBody className="p-0">
              <User
                  name="Jane Doe"
                  description="Verified"
                  avatarProps={{
                    src: "https://www.gravatar.com/avatar/?d=mp",
                    size: "xs",
                  }}
                  className="my-3"
                  classNames={{
                    name: "text-white",
                    description: "text-yellow-400 text-xs",
                  }}
                />
                <Image
                  shadow="sm"
                  radius=""
                  width="100%"
                  alt={item.title}
                  className="object-cover h-[140px]"
                  src={item.img}
                />
               
              </CardBody>
              <CardFooter className="justify-between p-4">
                <b className="text-white">{item.title}</b>
                <p className="text-white/80">{item.price}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Market;
