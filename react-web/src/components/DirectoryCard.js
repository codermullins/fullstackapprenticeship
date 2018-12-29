import React from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import {icons} from '../utils'
const styles = {
  card: {
    minWidth: 275
  },
  title: {
    flexGrow: 1,
    fontSize: 24
  },
  pos: {
    marginBottom: 12
  },
  titleContainer: {
    testAlign: "center",
    display: "flex",
    justifyContent: "space-between"
  }
};



const DirectoryCard = props => {
  const { folders } = props;
  const directories = folders.map((val, i) => {
    return (
      <Grid key={i} item xs={6} sm={3}>
        <Card className={styles.card}>
          <CardContent>
            <div style={styles.titleContainer}>
              <Typography
                className={styles.title}
                color="textSecondary"
                gutterBottom
              >
                {val.name}
              </Typography>
              <Icon>{icons[val.name]}</Icon>
            </div>
          </CardContent>
          <CardActions>
            <Button component={Link} to={`/tool/${val.type}`} size="small">
              View Content
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });
  return !folders ? "Loading" : directories;
};

export default withStyles(styles)(DirectoryCard);
