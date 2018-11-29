import React, {Component} from 'react';
import {AsyncStorage, Platform, StyleSheet, Text, View, ListView, RefreshControl} from 'react-native';

type Props = {};
export default class Results extends Component<Props> {

  results = [
    {
      nick: 'Marek',
      score: 18,
      total: 20,
      type: 'historia',
      date: '2018-11-22'
    },
    {
      nick: 'Marek Drugi',
      score: 15,
      total: 20,
      type: 'historia',
      date: '2018-11-23'
    },
    {
      nick: 'Marek Trzeci',
      score: 12,
      total: 20,
      type: 'historia',
      date: '2018-11-24'
    }
  ]

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      dataSource: ds.cloneWithRows(this.results),
    };
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  fetchData = async() => {
    try {
      var results = await AsyncStorage.getItem('results');
      results = JSON.parse(results);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({ dataSource: ds.cloneWithRows(results) });
    } catch (error) {}
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.column}>nick</Text>
        <Text style={styles.column}>score</Text>
        <Text style={styles.column}>total</Text>
        <Text style={styles.column}>type</Text>
        <Text style={styles.column}>date</Text>
      </View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(data) =>
          <View style={styles.row}>
            <Text style={styles.column}>{data.nick}</Text>
            <Text style={styles.column}>{data.score}</Text>
            <Text style={styles.column}>{data.total}</Text>
            <Text style={styles.column}>{data.type}</Text>
            <Text style={styles.column}>{data.date}</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5ECEF',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#A5CCCF',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#C5CCCF',
  },
  column: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center'
  }
});
