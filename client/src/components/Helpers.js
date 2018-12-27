/* eslint array-callback-return: 'off' */

export const findNotesInSelectedScale = ({ controls }) => findNotesInScale({ 
  root: controls.key, 
  scale: controls.constants.scales[controls.scale], 
  notes: controls.constants.notes,
});

export const findNotesInScale = ({ root, scale, notes }) => {
  const notesPattern = scale.notes;
  const index = notes.findIndex(i => i === root);

  let notesInScale = [];

  for (let i = 0; i < notesPattern.length; i++) {
    let nextNote = index + notesPattern[i];
    if (nextNote >= 12) nextNote = nextNote % 12;

    notesInScale.push(notes[nextNote]);
  }

  return notesInScale;
}

export const generateScales = ({ constants }) => {
  const { scales, notes } = constants;

  let allScales = {};

  notes.forEach(root => {
    Object.entries(scales).map(([name, scale]) => {
      let scalesLabel = `${root} ${scale.abr}`;
      allScales[scalesLabel] = {
        notes: findNotesInScale({ root, scale, notes }),
        root,
        scale: name,
      }
    });
  });

  return allScales;
}

export const arrayFullyIncludes = ({ source, includes }) => {
    let value = 0;

    includes.forEach(n => {
      value += source.includes(n);
    });

    return (value === includes.length);
}