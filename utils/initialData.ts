import { ShoppingItem } from "@/app/types";

const initialDataString = `Banana-3-no
Bendakaya-1kg
Dondakaya-kg
Tomato-red and hard -1kg
Kottomira-1 katta/10rs
Karivepaku-10rs
Potato-2kg-no
Beans-1/2 kg
Vankaya-1/2kg
Carrot-1 kg
Keera -1 kg-no
Thota koora-10rs
Chukka koora-10rs
Palakoora-10rs-no
Beera kayalu- kg
Sora kaaya-10rs
Allam-1/4kg
Vellulli-1/2kg-no
Pachi mirchi-1/2 kg
Mushroom -1 packet
Gongoora-10-rs
Tamalapaakulu-10rs
Lemon-24
Kaakarakaaya -1/2kg-no
Mullangi-3`;

export function parseInitialData(): ShoppingItem[] {
  const lines = initialDataString.split("\n").filter((line) => line.trim());
  const now = Date.now();

  return lines.map((line, index) => {
    const trimmed = line.trim();
    const hasNo = trimmed.toLowerCase().endsWith("-no");
    
    let workingString = trimmed;
    if (hasNo) {
      workingString = trimmed.slice(0, -3).trim();
    }

    let name = workingString;
    let quantity = "";
    let note = "";

    // Handle cases like "Tomato-red and hard -1kg"
    // Extract note that appears before the last dash-quantity pattern
    const notePattern = /^(.+?)\s+-\s+(.+?)\s+-\s*(\d+.*?)$/;
    const noteMatch = workingString.match(notePattern);
    if (noteMatch) {
      name = noteMatch[1].trim();
      note = noteMatch[2].trim();
      quantity = noteMatch[3].trim();
    } else {
      // Try to extract quantity/price from the end
      // Patterns: -1kg, -10rs, -1/2kg, -1 packet, -24, -kg, etc.
      const quantityPatterns = [
        /-(\d+\/\d+\s*kg)$/i,           // 1/2kg
        /-(\d+\s*(kg|packet|rs|katta))$/i, // 1kg, 10rs, 1 packet
        /-(\d+\s*katta\/\d+rs)$/i,      // 1 katta/10rs
        /-(\d+)$/,                       // 24, 3
        /-(\d+-\d+rs)$/i,                // 10-rs
        /-(\s*kg)$/i,                    // -kg
      ];
      
      let found = false;
      for (const pattern of quantityPatterns) {
        const match = workingString.match(pattern);
        if (match) {
          quantity = match[1].trim();
          name = workingString.slice(0, match.index).trim();
          found = true;
          break;
        }
      }

      // If no quantity pattern found, check if there's a dash-separated value at the end
      if (!found) {
        const lastDashIndex = workingString.lastIndexOf("-");
        if (lastDashIndex > 0) {
          const afterDash = workingString.slice(lastDashIndex + 1).trim();
          // If it looks like a quantity (contains numbers or common units)
          if (/\d/.test(afterDash) || /kg|rs|packet|katta/i.test(afterDash)) {
            quantity = afterDash;
            name = workingString.slice(0, lastDashIndex).trim();
          }
        }
      }
    }

    // Clean up name - remove any trailing dashes
    name = name.replace(/\s*-\s*$/, "").trim();

    return {
      id: `item-${now}-${index}`,
      name: name || trimmed,
      quantity: quantity || "",
      note: note || undefined,
      status: hasNo ? "not-needed" : "to-buy",
      createdAt: now + index,
      updatedAt: now + index,
    };
  });
}

