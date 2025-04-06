# HeroForge

## Goal:
Build an Angular app where users can:
1. View a list of heroes.
2. Add/remove heroes from the squad.
3. Assign/remove gear to heroes.

## Requirements
1. Hero List (Main Page)
   - Display a list of heroes fetched from a mock API.
   - Each hero has:
     - Name
     - Profession (e.g., Mage, Archer, Royal, Mystic)
   - Each hero has an "Add to Squad" / "Remove from Squad" button.
   - Squad limit: Max 3 heroes.
   - A section above the list displays the current squad members.

2. Gear Management (Hero Page)
   - Clicking on a hero navigates to a hero details page. 
   - On this page, users can:
     - View the hero’s name, profession, and assigned gear.
     - Assign gear from a predefined list (mocked from API).
     - Limit: Each hero can have up to 3 gear items.
     - Remove gear items if needed.

3. Provided Setup (Mock API)\
Several services are already provided. They are there to manage:
   - heroes
   - gear
   - squad 
