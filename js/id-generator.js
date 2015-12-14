var currentID = 0;

// Used to generate unique IDs for each pane.
export default function getID() {
  return currentID++;
}
