import { xmlBlocks, xmlBlockParameters } from "@/db/schema";

import { InferSelectModel } from "drizzle-orm";

// Base XML Block type
export type XmlBlock = InferSelectModel<typeof xmlBlocks>;

// Base XML Block Parameter type
export type XmlBlockParameter = InferSelectModel<typeof xmlBlockParameters>;

// ================================================================================
// Payload types
// ================================================================================

export type XmlBlockPayload = {
  // The columns directly from the `brand_xml_blocks` table
  brandId: string;
  xmlBlockId: string;

  // The joined xmlBlock object (using the columns you requested)
  xmlBlock: {
    id: string;
    name: string;
    tsName: string;
    description: string;

    // The nested xmlBlockParameters array
    xmlBlockParameters: {
      id: string;
      name: string;
      tsName: string;
      required: boolean;
      description: string | null; // or just string if 'description' is NOT NULL
      dataType: string;
    }[];
  };
};
