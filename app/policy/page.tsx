"use client";

import { CloseButton, Divider, Input, Table } from "@mantine/core";
import { useDeferredValue, useEffect, useState } from "react";
import { MoreHorizontal, Search } from "lucide-react";
import { handlePolicyRequest } from "@/api/policy";

interface PolicyItemProps {
  policyNumber?: string;
  policyStartDate?: string;
  policyEndDate?: string;
  productCode?: string;
  policyHolder?: string;
  premiumAmount?: number;
}

export default function PolicyPage() {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const deferfedData = useDeferredValue(data);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await handlePolicyRequest.searchPolicy(query, {
          signal: abortController.signal,
        });

        if (res?.status === 200) {
          setData(res.data.policies);
        }
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [query]);

  const rows = data?.map((p: any, i: number) => (
    <Table.Tr key={p.policyNumber}>
      <Table.Td>{i}</Table.Td>
      <Table.Td>{p.policyNumber}</Table.Td>
      <Table.Td>{p.policyStartDate}</Table.Td>
      <Table.Td>{p.policyEndDate}</Table.Td>
      <Table.Td>{p.productCode}</Table.Td>
      <Table.Td>{p.policyHolder}</Table.Td>
      <Table.Td>{p.premiumAmount}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="space-y-2">
      <Input
        placeholder="Please enter policy hodler or policy number"
        leftSection={<Search size={16} />}
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
            }}
            style={{ display: query ? undefined : "none" }}
          />
        }
      />
      {loading && (
        <div className="flex justify-center">
          <MoreHorizontal />
        </div>
      )}
      <Divider my="md" />

      {data && data.length > 0 && (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Index</Table.Th>
              <Table.Th>Policy Number</Table.Th>
              <Table.Th>PolicyStart Date</Table.Th>
              <Table.Th>PolicyEnd Date</Table.Th>
              <Table.Th>Product Code</Table.Th>
              <Table.Th>Policy Holder</Table.Th>
              <Table.Th>Premium Amount</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}

      {data && data.length === 0 && !loading && (
        <h2 className="text-xs text-center">NOTHING RESULT</h2>
      )}
    </div>
  );
}
