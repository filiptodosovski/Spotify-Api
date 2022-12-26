import React, { useEffect, useState } from "react";
import {
  PlaySquareOutlined,
  CustomerServiceOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Empty, Table, Badge, Tag } from "antd";
import { getAllPlaylists, getTracksForCategory } from "../fetch-info";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";

const { Content, Footer, Sider } = Layout;

const columns = () => [
  {
    title: "Playlist ID",
    dataIndex: "id",
    key: "id",
    className: "catid",
  },

  {
    title: "Playlist Name",
    dataIndex: "playlist_name",
    key: "playlist_name",
  },
  Table.EXPAND_COLUMN,
];

interface DataType {
  id: string;
  playlist_name: string;
}

const tracksColumns: ColumnsType<DataType> = [
  {
    title: "Track ID",
    dataIndex: "id",
    key: "id",
    width: 400,
  },
  {
    title: "Track Name",
    dataIndex: "track_name",
    key: "track_name",
  },
  {
    title: "Artist",
    dataIndex: "artist",
    key: "artist",
  },
];

const Playlists: React.FC = () => {
  const [playlists, setPlaylists] = useState<any>([]);
  const [tracks, setTracks] = useState<any>([]);

  const onExpand = (expanded: boolean, records: { id: string }) => {
    getTracksForCategory(records.id).then((res) =>
      setTracks({ ...tracks, [records.id]: res.data[0].track })
    );
  };

  const fetchPlaylists = () =>
    getAllPlaylists()
      .then((res) => setPlaylists(res.data))
      .catch(function (error: any) {
        console.log(error);
      });

  useEffect(() => {
    console.log("component mounted");
    fetchPlaylists();
  }, []);

  const renderPlaylists = () => {
    if (playlists.length <= 0) {
      return (
        <>
          <Empty />
        </>
      );
    }

    return (
      <>
        <Table
          className="table"
          dataSource={playlists}
          columns={columns()}
          bordered
          onExpand={onExpand}
          expandable={{
            expandedRowRender: (record) => (
              <Table
                style={{ marginRight: "6vh" }}
                dataSource={tracks[record?.id]}
                columns={tracksColumns}
                bordered
              />
            ),
          }}
          title={() => (
            <>
              <Tag>Number of Categories</Tag>
              <Badge
                count={playlists.length}
                style={{ backgroundColor: "#52c41a", marginLeft: "7px" }}
              />
              <br></br>
              <br></br>
            </>
          )}
          scroll={{
            y: 600,
          }}
          rowKey={(category: { id: any }) => category.id}
        />
      </>
    );
  };

  return (
    <Layout
      style={{ minHeight: "100vh", marginTop: "-1vh", marginLeft: "-2vh" }}
    >
      <Sider>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <h1 className="titletext">Spotify Api</h1>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["3"]} mode="inline">
          <Menu.Item key="1">
            <HomeOutlined />
            <span>Home</span>
            <Link href="/"></Link>
          </Menu.Item>
          <Menu.Item key="2">
            <PlaySquareOutlined />
            <span>Categories</span>
            <Link href="/category"></Link>
          </Menu.Item>
          <Menu.Item key="3">
            <CustomerServiceOutlined></CustomerServiceOutlined>
            <span>Playlists</span>
            <Link href="/playlists"></Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Spotify</Breadcrumb.Item>
            <Breadcrumb.Item>Playlists</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {renderPlaylists()}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Filip 2022</Footer>
      </Layout>
    </Layout>
  );
};

export default Playlists;
