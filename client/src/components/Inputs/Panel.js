import React from 'react';

// Control Sections / Panels
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const helper = ({ id, selected, setSelected }) => ({
  expanded: selected === id,
  onChange: () => selected === id ? setSelected(null) : setSelected(id),
});

export default ({ title, selectedState, children }) => {
  const [selected, setSelected] = selectedState;

  return (
    <ExpansionPanel {...helper({ id: title, selected, setSelected })}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};