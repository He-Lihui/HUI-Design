import { Meta, StoryFn } from "@storybook/react"
import Tree from "./tree"
import React from "react"
import { TreeData } from "./types/type"
export default { 
    title: 'Tree',
    id: 'Tree',
    component: Tree,
    tags: ['autodocs'],
    parameters: {
      docs: {
        source: {
          type: "code",
        },
      }
    }
  } as Meta<typeof Tree>

export const BasicTree: StoryFn<typeof Tree> = (args) => {
  const treeData: TreeData=  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title:"ssss", key: '0-0-1-0' }],
      },
    ],
  } 
    return (
        <Tree {...args} data={treeData}>
        </Tree>
    )
}