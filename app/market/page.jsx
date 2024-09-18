"use client";

import React from "react";
import { Tabs, Tab, Input, Card, CardBody, CardFooter, Image, Button, User } from "@nextui-org/react";


const list = [
  {
    title: "Orange",
    img: "https://media.istockphoto.com/id/1131608539/photo/a-lot-of-oranges-with-some-cut-in-half-and-leaves.jpg?s=612x612&w=is&k=20&c=Mb4OCaLQ5JMaLPbPjcMfBxiYIUmXc4KBEMf5CRoqKvs=",
    price: "$5.50",
    shortDescription: "High-quality oranges, ideal for juicing or resale.",
    rating: 4,
    stock: "20 kg",
    sellerName: "Farm Fresh",
    sellerAvatar: "https://www.gravatar.com/avatar/?d=mp",
  },
  {
    title: "Raspberry",
    img: "https://media.istockphoto.com/id/1263891766/photo/collection-of-fresh-red-raspberries.jpg?s=1024x1024&w=is&k=20&c=fIHUupGt8I15pf40owhuD6Cgn302u2TBktLfLOKiEbY=",
    price: "$10.00",
    shortDescription: "Sweet and vibrant raspberries, perfect for high-end markets.",
    rating: 5,
    stock: "15 kg",
    sellerName: "Berry Delight",
    sellerAvatar: "https://www.gravatar.com/avatar/?d=mp",
  },
  {
    title: "Lemon",
    img: "https://media.istockphoto.com/id/1404188749/photo/lemons-in-the-lemon-tree.jpg?s=612x612&w=is&k=20&c=aIKVvTwSQhcI0zI2-iZnw9OMgnr-s62ZaKYQPGotrxw=",
    price: "$5.30",
    shortDescription: "Citrus lemons, ideal for culinary uses and resale.",
    rating: 4,
    stock: "12 kg",
    sellerName: "Citrus Grove",
    sellerAvatar: "https://www.gravatar.com/avatar/?d=mp",
  },
  {
    title: "Avocado",
    img: "https://media.istockphoto.com/id/1332477907/photo/fresh-organic-avocado-at-farmers-market-healthy-food.jpg?s=612x612&w=is&k=20&c=EB3KfFfcjW7SsF6byZLeFvNkCkXFrDF92YITmH6w09E=",
    price: "$15.70",
    shortDescription: "Organic avocados, perfect for farm-to-table markets.",
    rating: 5,
    stock: "8 kg",
    sellerName: "Avocado Acres",
    sellerAvatar: "https://www.gravatar.com/avatar/?d=mp",
  },
  {
    title: "Banana",
    img: "https://media.istockphoto.com/id/1350708696/photo/colombian-fruits-and-vegetables.jpg?s=612x612&w=is&k=20&c=3WRmDfNnj9Z9tkJR71jwpON5F3x0gNGEaXXQuv4fvd8=",
    price: "$7.50",
    shortDescription: "Ripe bananas, ideal for smoothie producers and retailers.",
    rating: 4,
    stock: "10 kg",
    sellerName: "Banana Barn",
    sellerAvatar: "https://www.gravatar.com/avatar/?d=mp",
  },
  {
    title: "Watermelon",
    img: "https://media.istockphoto.com/id/938827438/photo/bulk-watermelons-from-a-street-market.jpg?s=612x612&w=is&k=20&c=OD0rT0uOBD9WlwnSc625lGcKT1KVoBS1WqLOxKS6Cnc=",
    price: "$12.20",
    shortDescription: "Juicy watermelons, perfect for summer markets and events.",
    rating: 3,
    stock: "5 kg",
    sellerName: "Melon Madness",
    sellerAvatar: "https://www.gravatar.com/avatar/?d=mp",
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
          className="mb-3"
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
              "hover:bg-default-200/20",
              "group-data-[focus=true]:bg-default-200/50",
              "!cursor-text",
            ],
          }}
        />

        
        


        <div className="flex w-full flex-col">
        <Tabs aria-label="Options" color="primary" className="" classNames="bg-white/10"  width="100px">
        <Tab key="market" title="Market" className="glass-tab">
              <div className="gap-4 grid sm:grid-cols-1 md:grid-cols-2 mt-3">
                {list.slice().reverse().map((item, index) => (
                  <Card
                    key={index}
                    className="bg-white/20 backdrop-blur-md border border-gray-300 shadow-xl w-full"
                    isPressable
                    onPress={() => console.log("item pressed")}
                  >
                    <CardBody className="p-3">
                      
                      <Image
                        shadow="sm"
                        width="100%"
                        alt={item.title}
                        className="object-cover h-[140px]"
                        src={item.img}
                      />
                      <div>
                      <User
                        name={item.sellerName}
                        description="Verified Seller"
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
                      <p className="text-white/80 text-sm">
                        {item.shortDescription || "No description available"}
                      </p>
                      </div>
                    </CardBody>
                    <CardFooter className="justify-between  py-2">
                      
                      <div className="flex flex-col">
                        <b className="text-white truncate">{item.title}</b>
                        <p className="text-white/80 text-sm text-start">{item.price}</p>
                      </div>
                      <div className="flex flex-col  ">
                        <div className="text-yellow-300 flex space-x-1 justify-end">
                          {[...Array(item.rating)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              className="h-4 w-4"
                            >
                              <path d="M3.612 15.443c-.396.198-.773-.149-.697-.592l.83-4.73L.173 6.765c-.329-.32-.158-.888.283-.95l4.898-.696L7.538.792c.197-.4.73-.4.927 0l2.184 4.327 4.898.696c.441.062.612.63.283.95l-3.573 3.356.83 4.73c.076.443-.301.79-.696.592L8 13.187l-4.389 2.256z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-white/60 text-xs ml-2 mt-1">{item.stock} in stock</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </Tab>

        <Tab key="topSelling" title="Top Selling">
        <div className="gap-4 grid sm:grid-cols-1 md:grid-cols-2 mt-3">
          {list.map((item, index) => (
             <Card
             key={index}
             className="bg-white/20 backdrop-blur-md border border-gray-300 shadow-xl w-full"
             isPressable
             onPress={() => console.log("item pressed")}
           >
             <CardBody className="p-3">
               
               <Image
                 shadow="sm"
                 width="100%"
                 alt={item.title}
                 className="object-cover h-[140px]"
                 src={item.img}
               />
               <div>
               <User
                 name={item.sellerName}
                 description="Verified Seller"
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
               <p className="text-white/80 text-sm">
                 {item.shortDescription || "No description available"}
               </p>
               </div>
             </CardBody>
             <CardFooter className="justify-between  py-2">
               <div className="flex flex-col">
                 <b className="text-white truncate">{item.title}</b>
                 <p className="text-white/80 text-sm text-start">{item.price}</p>
               </div>
               <div className="flex flex-col  ">
                 <div className="text-yellow-300 flex space-x-1 justify-end">
                   {[...Array(item.rating)].map((_, i) => (
                     <svg
                       key={i}
                       xmlns="http://www.w3.org/2000/svg"
                       fill="currentColor"
                       viewBox="0 0 16 16"
                       className="h-4 w-4"
                     >
                       <path d="M3.612 15.443c-.396.198-.773-.149-.697-.592l.83-4.73L.173 6.765c-.329-.32-.158-.888.283-.95l4.898-.696L7.538.792c.197-.4.73-.4.927 0l2.184 4.327 4.898.696c.441.062.612.63.283.95l-3.573 3.356.83 4.73c.076.443-.301.79-.696.592L8 13.187l-4.389 2.256z" />
                     </svg>
                   ))}
                 </div>
                 <span className="text-white/60 text-xs ml-2 mt-1">{item.stock} in stock</span>
               </div>
             </CardFooter>
           </Card>
          ))}
        </div>
        </Tab>

        <Tab key="myListed" title="My Listed" className="">
        <div className="gap-4 grid sm:grid-cols-1 md:grid-cols-2 mt-3">
          <Button className="text-sm py-4 px-4 mb-4" shadow color="primary" auto>
            Sell Your Items
          </Button>
        </div>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {list.slice(0, 3).map((item, index) => (
              <Card
              key={index}
              className="bg-white/20 backdrop-blur-md border border-gray-300 shadow-xl w-full"
              isPressable
              onPress={() => console.log("item pressed")}
            >
              <CardBody className="px-3">
                <div className="absolute z-20 right-0 top-0 bg-white/80 px-2 pl-2.5 rounded-bl-xl">
                   <i class='bx bxs-edit'></i>
                </div>
                <Image
                  shadow="sm"
                  width="100%"
                  alt={item.title}
                  className="object-cover h-[140px]"
                  src={item.img}
                />
                <p className="text-white/80 text-sm px-3 py-2">
                  {item.shortDescription || "No description available"}
                </p>
              </CardBody>
              <CardFooter className="justify-between px-4 py-2">
                <div className="flex flex-col">
                  <b className="text-white truncate">{item.title}</b>
                  <p className="text-white/80 text-sm text-start">{item.price}</p>
                </div>
                <div className="flex flex-col  ">
                  <div className="text-yellow-300 flex space-x-1 justify-end">
                    {[...Array(item.rating)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                      >
                        <path d="M3.612 15.443c-.396.198-.773-.149-.697-.592l.83-4.73L.173 6.765c-.329-.32-.158-.888.283-.95l4.898-.696L7.538.792c.197-.4.73-.4.927 0l2.184 4.327 4.898.696c.441.062.612.63.283.95l-3.573 3.356.83 4.73c.076.443-.301.79-.696.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white/60 text-xs ml-2 mt-1">{item.stock} in stock</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div> 
        </Tab>
      </Tabs>
    </div>  
        
      </div>
    </div>
  );
};

export default Market;
