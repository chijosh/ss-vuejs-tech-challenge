# Cologne Zoo v0.0.8 - (13.08.2023)

### Changelog

## [v0.0.8] - 13.08.2023
### Added
- Bumped `nuxt.js` version from rc.
- Feature to display a welcome popup ONLY once to users when they visit the home page. The state is maintained using `localStorage`.
- New `showPopupOnce` method to handle popup and localStorage logic.
- Lifecycle hook `onMounted` to initiate the popup logic when the component is mounted.
- Error handling for potential `localStorage` issues in the `showPopupOnce` method. If there's an error accessing `localStorage`, it's caught and logged without breaking the application.

### Changed
- Updated the `AnimalTable` component to integrate the popup functionality.

### Notes
- Though the error is logged, consider adding more user-friendly notifications for such scenarios in future updates.

## [v0.0.7] - 12.08.2023
### Added
- Implemented responsive design to the main `App.vue` layout.
- Introduced `sweetalert2` for modals.
- Added an eye icon for viewing more details about animals in the table.

## [v0.0.6] - 11.08.2023
### Added
- `calculateFoodRequirement` function in `helper.ts`:
  - Computes the daily food requirement for an animal based on various criteria including weight, height, age, favourite fruit, gender, and species.
  - Handles special conditions for fishes and adjustments based on age, favorite fruit being cherries, and gender.
- Tests for `calculateFoodRequirement` function:
  - Ensures the function accurately calculates the food requirement based on different scenarios and edge cases.

## [v0.0.5] - 11.08.2023
### Added
- Introduced a new view to display complete details of an animal. This feature addresses the zookeepers' request to have a comprehensive view of animal information.
- Added eye icon for viewing more details of an animal in the table.
- Integrated SweetAlert2 for modal pop-up displaying animal details.

### Notes
- If you encounter any issues with the new eye icon or modal, please report them to the development team.

## [v0.0.4] - 11.08.2023
### Added
- The `Name` column that used to be in _third_ place has been added.

### Changed
- Updated `animalsSortedByName` function to sort animals by their name.
- Ensured the age of the animals should show the age in years and not the birthdate using the `calculateAgeInYears` function.

## [v0.0.3] - 11.08.2023
### Added
- Support in `calculateAgeInYears` function to handle `birthdate` values in both `Date` object format and string format.

### Fixed
- Resolved error `birthdate.setHours is not a function` by ensuring the conversion of `birthdate` to a `Date` object in the `calculateAgeInYears` function.
- Ensured the age of animals displays in years instead of raw birthdate in the Vue.js table component.

### Changed
- Modified the type of `birthdate` parameter in `calculateAgeInYears` to `Date | string`.


## [v0.0.2] - 10.08.2023
### Fixed
- Updated the `calculateAgeInYears` function in `helpers.ts` to provide more accurate age calculations:
  - Returns 0 for a birthdate that's today.
  - Returns 1 for any birthdate within the past year but not today.
  - Returns the correct age in full years for any birthdate more than a year ago.

### Changed
- Refactored tests in `composables/helpers.test.ts` to align with the updated logic of the `calculateAgeInYears` function:
  - Added a test to verify an age of 0 for a birthdate that's today.
  - Added a test to verify an age of 1 for a birthdate within the past year but not today.
  - Added a test to verify the correct age in full years for a birthdate more than a year ago.

---

## [v0.0.1] - 10.08.2023

- Naming Convention Adjustments:
  Observed inconsistency in naming conventions throughout the codebase.
  Adjusted variables to follow the convention. Example: Changed ANIMALS to animals.
- Notification Improvements:
  Previously, notifications were managed with a simple alert('get wrecked cologne zoo!').
  Replaced the alert mechanism with the sweetalert2 library for enhanced user experience.
- Notification Frequency Control:
  TODO: Implement a session or localStorage mechanism to ensure that the notification only pops up once for each user session. This prevents repetitive and potentially disruptive pop-ups.
- Date Format Enhancement:
  Noticed that the table's date format was not easily readable.
  Made necessary adjustments to present dates in a clearer and more user-friendly format.
