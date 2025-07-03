# Help

For a step-by-step guide on how to connect to the server, please see [Play Now »](/minecraft/play).

# Updates

The server backend and server software are updated every Friday at **06:00** Swedish time.
Expected downtime is **2 hours**, but is usually much shorter.

A new world for **The Abyss** is generated during each maintenance window.

## Minecraft Version

The server runs [PaperMC](https://papermc.io/) and always uses the latest PaperMC version with at least **100** builds.
This means the server may run an experimental version if it meets the 100-build threshold.
Currently, the server runs **PaperMC 1.21.5** build **114**.

It usually takes 2-3 weeks after a new Minecraft version is released for PaperMC to reach 100 builds.
Because of this, the server may not run the absolute latest Minecraft version immediately after its release.

However, because the server uses several plugins, updates may sometimes take longer.
If a plugin fails to load or causes errors with the new Minecraft version, the server will automatically roll back to the previous version and try updating again the following week.

Check the [PaperMC download page](https://papermc.io/downloads/paper) for the most recent builds.

# Praying

Praying offers a number of beneficial effects.
Not only does it let you store your currently held experience, it can also restore health and hunger, and grant powerful boons.

Praying is only available in **Sanctuary**.

## The Praying Menu

You can open the praying menu by right-clicking any lit [Candle](https://minecraft.wiki/w/Candle) you have access to in **Sanctuary**.

Any action you take in the menu will consume one flame from the candle.
You can stack multiple candles to increase the number of available flames, and lighting one lights the whole stack.

Candles are usually lit with a [Flint and Steel](https://minecraft.wiki/w/Flint_and_Steel).

## Divine Experience

Praying allows you to deposit and withdraw experience as **Divine Experience**.
There is no penalty for depositing or withdrawing experience.
However, the amount of **Divine Experience** you can store depends on how many candles are stacked together.

The current **Divine Experience** limits are:

- **1 Candle**: 500
- **2 Candles**: 2500
- **3 Candles**: 7000
- **4 Candles**: 15000

## Alignment and Boons

At certain structures within **Sanctuary's Heart**, you can use the `/pray` command to align yourself with either **Good** or **Bad**.
There is a time limit of **30 minutes** between prayers, and the alignment depends on the structure you pray at.

A strong enough alignment in either direction unlocks powerful boons in the praying menu, offering unique and strong temporary buffs.
Your alignment is reset to **Neutral** after a boon has been applied.

# Claims

A **Claim** is a player-owned area in **Sanctuary**, where items and blocks are safe from other players.
There is currently no limit to the number of claims you can own, and you can freely remove, resize, or expand any claim, as long as you have enough claim blocks.

Placing your first chest in **Sanctuary** will automatically create a small claim area.
You will be left with some additional claim blocks to expand your claim area.

Use `/claimslist` to view your current claims and remaining claim blocks.
To abandon a claim, stand inside it and use `/abandonclaim` or `/abandonallclaims` to remove all your claims.

## Inactive Claims Removal

Players that have not been online for a while will have their claims removed to free up space for new players.
Simply being online in **Sanctuary** will prevent this.

Initial chest claims will be removed after **30 days** of inactivity.
Make sure to expand your claim area with your left over claim blocks to prevent this!

Claims that have been expanded will be removed after **730 days** of inactivity.

## Visualizing Claims

There are two ways to visualize claim boundaries.
First, equip a [Stick](https://minecraft.wiki/w/Stick), then:

- Right-click any claimed block to visualize the claim boundaries
Or:
- While crouching, right-click any block to visualize all nearby claims

There are two types of claim boundaries:

- **Gold** indicate player-owned claims
- **Red** indicate protected areas you cannot modify or claim

The boundaries will automatically be hidden after a while.
To hide the boundaries early, right-click any unclaimed block with your [Stick](https://minecraft.wiki/w/Stick).

## Resizing Claims

You are free to resize your claims at any time using a [Golden Shovel](https://minecraft.wiki/w/Golden_Shovel).
Reducing the size will return any claim blocks used in the removed area, while expanding will require additional claim blocks.
You cannot shrink a claim to below 80 blocks, or a width less than 5 blocks.

While standing inside your claim, equip your [Golden Shovel](https://minecraft.wiki/w/Golden_Shovel), then:

1. Right-click one of the glowing corner markers
2. Right-click again to set the new size:
	- **Inside** the current area to shrink
	- **Outside** the current area to expand

## Creating a New Claim

To create a new claim area:

- You must have at least 80 claim blocks available
- The claim must be at least 80 blocks and at least 5 blocks wide

Then:

1. Use a [Stick](https://minecraft.wiki/w/Stick) to locate unclaimed land
2. Equip your [Golden Shovel](https://minecraft.wiki/w/Golden_Shovel)
3. Right-click an unclaimed block
4. Right-click the opposite corner diagonally to create the claim

## Trust and Permissions

You can allow other players to access or build in your claim.
While standing inside your claim, use one of the following commands:

- `/trustlist` — Lists players with permissions
- `/trust <player>` — Full build/edit/container access (be careful!)
- `/containertrust <player>` — Access to chests, furnaces, etc.
- `/accesstrust <player>` — Access to doors, buttons, beds
- `/permissiontrust <player>` — Allows the player to grant others access
- `/untrust <player>` — Remove permissions from a player
- `/untrust all` — Remove all permissions from everyone

## Subdividing Claims

You can split a claim into smaller **subclaims**, each with their own permission settings.
For example, you can allow visitors to build in one area, while keeping the rest private.

While standing inside your claim, equip a [Golden Shovel](https://minecraft.wiki/w/Golden_Shovel), then:

- `/subdivideclaims` — Enables subdivision mode for your shovel
- `/basicclaims` — Returns your shovel to normal mode
- `/restrictsubclaim` — Prevents a subclaim from inheriting permissions from its parent

# Sanctuary's Heart

The four central locations in **Sanctuary** rotate through different events, NPCs, and structures.
Most are active between **08:00 - 23:00** Swedish time, though some minor occurrences happen outside those hours.

Each structure includes at least one container (often hidden) that may contain loot, refreshed at random intervals. Anyone can take these items, so check them frequently!

To interact with NPCs, simply right-click them.
However, some may only respond with the correct item in your inventory.

## Edicts

**Edicts** are daily generated tasks that you can accept from **Society Voices**.

Every day, two **Society Voices** will visit **Sanctuary**:

- The first one arrives at **09:00**, and leaves at **17:00**
- The second one arrives at **15:00**, and leaves at **22:00**

Each **Society Voice** offer unique **Edicts** that reward **Favor** upon completion.
Earn enough **Favor** and you will be rewarded with a **Society Reward**.

### Accepting an Edict:

1. Right-click a **Society Voice**
2. Hover over any **Edict** to view its details
3. Left-click to accept

You may only have one active **Edict** at a time.
Each **Edict** has a time limit of **10 hours**, and there is no penalty for failing an **Edict**.

### Renouncing an Edict:

Renouncing an **Edict** is only possible while the **Society Voice** is still present in **Sanctuary**.

1. Right-click the **Society Voice** that gave you the **Edict**
2. Right-click your active **Edict**
	- <small>The active **Edict** will shimmer</small>
3. Left-click "Release Binding" (green button)

There is no penalty for renouncing an **Edict**, and you can accept the same **Edict** again.

## The Reliquary

The **Reliquary** is present daily between **09:00** and **23:00**.

His main role is to reward you with **Society Rewards** when you have earned enough **Favor** from the **Society Voices**.
**Society Rewards** mainly give you **Emeralds**, but will also include other useful items.

The **Reliquary** will hand out a free daily **Alms** (usually food), and restore a portion of your hunger and health if low.
Be sure to visit him at the start of your day, or when you need to quickly restore your hunger and health.

# Shaders

The recommended shaderpack is [BSL Shaders](https://modrinth.com/shader/bsl-shaders) with these [Custom Settings](https://gist.githubusercontent.com/Hezkore/7f23e7604c69c8cfa90216bc003f2c21/raw/cc539908a031fbf525d085fe168492351d7a8153/BSL.txt).
You will need either [Iris](https://www.irisshaders.dev/download) or [OptiFine](https://optifine.net/downloads) to use the shaderpack and apply the custom settings.
However, OptiFine usually lacks support for the latest Minecraft versions, so Iris is recommended.

## Installing Iris or OptiFine

To install support for shaders via Iris or OptiFine, follow these steps:

1. Download [Iris Universal JAR](https://www.irisshaders.dev/download) or [OptiFine JAR for Minecraft 1.21.5](https://optifine.net/downloads)
2. Run the downloaded JAR file to start the installer
	- <small>If double-clicking doesn't start the installer, use command: `java -jar <file>.jar`</small>
3. In the installer, make sure to select Minecraft version **1.21.5** and click "Install"
4. Open the Minecraft Launcher, which should have a new profile with Iris or OptiFine
5. Start Minecraft with the new profile

If the above steps did not work, see the official [Iris Installation](https://github.com/IrisShaders/Iris/blob/multiloader-new/docs/guide.md) guide.

## Installing BSL Shaders

With Iris or OptiFine installed, you can install the shaderpack.
Download the ZIP file with the shaders, then place the ZIP file in your Shader Packs folder.

Follow these steps:

1. Download the [BSL Shaders ZIP](https://modrinth.com/shader/bsl-shaders) for Minecraft **1.21.5** and Iris or OptiFine depending on what you installed
2. Open Minecraft and go to **Options... → Video Settings... → Shaders Packs...** and click "Open Shader Packs Folder..."
3. Move the downloaded BSL Shaders ZIP file into the newly opened Shader Packs folder
4. Go back to Minecraft, and you should see the BSL Shaders in the list, click it and then "Apply"

## Custom BSL Settings

To apply the custom BSL settings, we need to grab the settings from the Custom Settings page and copy them to a text document in the Shader Packs folder.

Follow these steps:

1. Go to the [Custom Settings](https://gist.githubusercontent.com/Hezkore/7f23e7604c69c8cfa90216bc003f2c21/raw/cc539908a031fbf525d085fe168492351d7a8153/BSL.txt) page
2. Copy the entire text content
	- <small>Hold Ctrl and press A, then hold Ctrl and press C to copy</small>
3. Open Minecraft and go to **Options... → Video Settings... → Shaders Packs...** and click "Open Shader Packs Folder..."
4. Create a new empty text document in the previously opened Shader Packs folder, name it something like `BSL.txt`
5. Open the newly created text document, and paste the previously copied text
	- <small>Hold Ctrl and press V to paste</small>
6. Save the text document and close it
7. Go back to Minecraft, and in the "Shaders Packs..." menu, select the BSL Shaders and click "Shader Pack Settings..."
8. In the top right corner, there's a button called "Import settings from file" next to the "Reset" button, hold your Shift key and press Reset first, then Import
9. Select the `BSL.txt` file you previously created, and click "Open"
10. Click "Done" until you are back in Minecraft

You should now have the custom BSL Shaders settings applied!

The custom settings are updated from time to time, so be sure to repeat this step once in a while.
