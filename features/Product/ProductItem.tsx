"use client";
import { Button, Table } from "@mantine/core";
import c from "./ProductItem.module.css";
import { useRouter } from "next/navigation";
import { useModal } from "@/utils/hooks/useModalStore";

type CoverType = {
  code: string;
  name: string;
  description: string;
  optional: boolean;
  sumInsured?: number;
};

interface ProductItemProps {
  code: string;
  covers: CoverType[];
  description: string;
  image: string;
  maxNumberOfInsured: number;
  name: string;
  questions: any[];
}
const ProductItem = ({
  code,
  name,
  image,
  covers,
  description,
}: ProductItemProps) => {
  const router = useRouter();
  const { onOpen } = useModal();
  const rows = covers.map((cover, i: number) => (
    <Table.Tr key={cover.name}>
      <Table.Td>{i}</Table.Td>
      <Table.Td>{cover.name}</Table.Td>
      <Table.Td>{cover.sumInsured}</Table.Td>
    </Table.Tr>
  ));

  const onCLick = () => {
    onOpen("PricingModal", { code, name, image, covers, description });
  };

  return (
    <div className={c.ProductItemWapper}>
      <img className={c.Image} src={image} />
      <div>
        <span>{name}</span>
        <span>({code})</span>
      </div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Index</Table.Th>
            <Table.Th>Rish</Table.Th>
            <Table.Th>Sum Insured</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <div className={c.GroupBtn}>
        <Button
          className={c.btn}
          variant="gradient"
          gradient={{ from: "red", to: "cyan", deg: 90 }}
        >
          Update
        </Button>

        <Button
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
          onClick={onCLick}
        >
          Buy
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
