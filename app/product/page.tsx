"use client";

import { handleProductRequest } from "@/api/product";
import { useQuery } from "@tanstack/react-query";

import ProductItem from "@/features/Product/ProductItem";
import c from "./Page.module.css";

const Page = () => {
  const { data, status } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: handleProductRequest.fetchProducts,
  });

  return (
    <div className={c.ProductListWrap}>
      {status === "pending" ? (
        <span>PENDING...</span>
      ) : (
        data.length > 0 &&
        data.map((item: any, indexItem: number) => {
          return <ProductItem key={indexItem} {...item} />;
        })
      )}
    </div>
  );
};

export default Page;
