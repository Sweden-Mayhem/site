# The Client

Dark Ages running in a client we wrote ourselves. It connects to our server and keeps the original low-resolution pixel world, while replacing the retail interface and adding the quality-of-life that the old client never had. This page lists what it currently does.

---

## Window and display

The window resizes to any size and the world fills it instead of sitting in a small fixed box. The pixel world is rendered low-res and scaled up cleanly, while the interface is drawn at the window's real resolution so text and frames stay sharp at any size. Alt+Enter toggles borderless fullscreen.

---

## Interface

The retail panels are replaced with a dark windowed UI.

- Inventory, Stats, Skills, Spells, Equipment, Legend, Group and Chat each open as their own window. Windows can be dragged, resized and pinned open.
- Skill, spell and inventory hotbars sit along the edges of the screen.
- Health and mana are shown as two orbs that empty as the values drop, with the exact numbers shown on hover.
- Hovering an item, skill, spell or stat shows a tooltip, including durability, weight and learn requirements.

---

## Controls

Keys are rebindable in Options. The defaults are set up for modern play: WASD or the arrow keys move, letter keys open panels, and the number row uses the hotbar.

- Left-click performs the obvious action on whatever you click, such as picking up an item, talking to an NPC or attacking an enemy.
- Right-click moves, with pathfinding that routes around corners and obstacles.
- Holding a movement key keeps walking. Holding the attack key keeps attacking.
- The classic turn-then-walk movement and click behaviour can be restored in Options if you prefer it.

---

## Chat

The chat window uses tabs: All, Public, Whisper and System, plus Group and Guild when you are in one, and any channels you join.

- Enter types to whichever tab you are on. Tab and Shift+Tab cycle between tabs while typing.
- Typing /say, /yell, /shout, /whisper, /guild or /group switches where the next message goes. Lines that start with / are sent as commands.
- Click a player's name in chat to start a whisper to them.
- Join a channel with the + button on the tab strip. Right-click a tab to mute its highlight, set a channel colour, or leave it.
- Up and Down recall what you typed before. The window keeps scrollback, supports the å ä ö characters, and does copy and paste.
- Speech bubbles appear over players' heads, and a soft dark backing keeps the text readable once the window has faded out.

---

## NPC dialogs

Dialog windows are centred and scaled to the screen, with the text drawn sharp on top of the frame. When a conversation starts, the camera moves to the speaker and lights them while the rest of the view dims. Long dialog text scrolls, and the navigation buttons only appear when they apply.

---

## Shops

The merchant window has category tabs and pages. Items show their icon, price, weight and description on hover, and a sell screen lists what a merchant will buy.

---

## Maps

The town map opens as a parchment scroll that unrolls, with the level hand-inked over the paper, walls drawn as rough ink lines, your position marked, and warps you can click to travel through. A wider travel map lets you pick a destination from a list.

---

## Light and time

Towns and outdoor maps move through day and night over real time. At night, lamps and lit tiles cast light and shadow, and the dark closes in around the lit areas. Enemies, NPCs, signs and loot show faintly through walls so they are not lost behind foreground objects.

---

## Movement and feel

Characters slide between tiles rather than snapping. Taking damage shakes the camera and flashes a red edge, and the world drains to grey while you are dead. Footsteps, gold and item cues, hit sounds and lobby music are in, with a slight pitch variation so repeated sounds are not identical.

---

## Connection

If the server restarts or the connection drops, the client freezes the view and reconnects with your session in the background, putting you back in the game without a manual relog.

---

## Options

Most of the above is adjustable: interface and hotbar scale, sound and music volume, tooltip size, delay and opacity, chat fade timers and font size, the day/night and behind-wall effects, the camera effects, and the control scheme.

---

The client is still in active development and changes regularly. If something looks wrong, let us know, and download the latest below.

<a href="https://darkages.swedenmayhem.se/download/SwedenMayhem-Client-Win.zip" class="button">Download for Windows</a>
