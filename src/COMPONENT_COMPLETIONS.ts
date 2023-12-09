export default {
  "BadgeBasic-outline-error-sm": {
    completion: "BadgeBasic-outline-error-sm",
    imports: [
      {
        importName: "React",
        importType: "default",
        importAs: null,
        importFrom: "react",
      },
      {
        importName: "Badge",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "BadgeText",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "BadgeIcon",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "GlobeIcon",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
    ],
    template:
      '<Badge variant={"outline"} action={"error"} size={"sm"}>\n      <BadgeText>\n        {text}\n      </BadgeText>\n      <BadgeIcon ml="\\$1" as={GlobeIcon} />\n    </Badge>',
    variableStatements: "let badgeIconAndTextSize = ''",
    description:
      "This is a basic Badge component example. The badge component lets you quickly and easily add status indicators to your interface for improved usability. They are designed to be attention-grabbing and quickly convey important information.",
  },
  DividerBasicDivider: {
    completion: "DividerBasicDivider",
    imports: [
      {
        importName: "React",
        importType: "default",
        importAs: null,
        importFrom: "react",
      },
      {
        importName: "Divider",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "HStack",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "Heading",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
    ],
    template:
      '<HStack flexDirection={props.orientation === \'vertical\' ? \'row\' : \'column\'} h={props.orientation === \'vertical\' ? 30 : \'auto\'} alignItems="center" justifyContent="center">\n      <Heading size="sm" fontWeight="\\$semibold">\n        Firefox\n      </Heading>\n      <Divider orientation={"vertical"} m="\\$3" />\n      <Heading size="sm" fontWeight="\\$semibold">\n        Chrome\n      </Heading>\n    </HStack>',
    variableStatements: "",
    description:
      "This is a basic Divider component example.  A divider is a thin line that groups content in lists and layouts.",
  },
  ActionsheetBasic: {
    completion: "ActionsheetBasic",
    imports: [
      {
        importName: "React",
        importType: "default",
        importAs: null,
        importFrom: "react",
      },
      {
        importName: "useState",
        importType: "named",
        importAs: null,
        importFrom: "react",
      },
      {
        importName: "Actionsheet",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "ActionsheetBackdrop",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "ActionsheetContent",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "ActionsheetDragIndicator",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "ActionsheetDragIndicatorWrapper",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "ActionsheetItem",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "ActionsheetItemText",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },

      {
        importName: "Button",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "ButtonText",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "Center",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "config",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/config",
      },
    ],
    template:
      "<Center>\n      <Button onPress={() => setShowActionsheet(true)}>\n        <ButtonText>Open</ButtonText>\n      </Button>\n      <Actionsheet isOpen={showActionsheet || showActionsheetProp} onClose={handleClose} {...props}>\n        <ActionsheetBackdrop />\n        <ActionsheetContent>\n          <ActionsheetDragIndicatorWrapper>\n            <ActionsheetDragIndicator />\n          </ActionsheetDragIndicatorWrapper>\n          <ActionsheetItem onPress={handleClose} isDisabled>\n            <ActionsheetItemText>Delete</ActionsheetItemText>\n          </ActionsheetItem>\n          <ActionsheetItem onPress={handleClose}>\n            <ActionsheetItemText>Share</ActionsheetItemText>\n          </ActionsheetItem>\n          <ActionsheetItem onPress={handleClose}>\n            <ActionsheetItemText>Play</ActionsheetItemText>\n          </ActionsheetItem>\n          <ActionsheetItem onPress={handleClose}>\n            <ActionsheetItemText>Favourite</ActionsheetItemText>\n          </ActionsheetItem>\n          <ActionsheetItem onPress={handleClose}>\n            <ActionsheetItemText>Cancel</ActionsheetItemText>\n          </ActionsheetItem>\n        </ActionsheetContent>\n      </Actionsheet>\n    </Center>",
    variableStatements:
      "const [showActionsheet, setShowActionsheet] = React.useState(false)\nconst handleClose = () => setShowActionsheet(false)",
    description:
      "This is a basic Actionsheet component example. Actionsheets are used to display a list of actions that can be performed on a page.",
  },
  "ToastPlacement-top-success": {
    completion: "ToastPlacement-top-success",
    imports: [
      {
        importName: "React",
        importType: "default",
        importAs: null,
        importFrom: "react",
      },
      {
        importName: "Toast",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "ToastTitle",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "useToast",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
    ],
    template:
      '<Toast nativeID={id} placement={"top"} action={"success"} variant={"solid"}>\n                <ToastTitle>\n                  Hello World Toast {id}\n                </ToastTitle>\n              </Toast>',
    variableStatements: "const toast = useToast()",
    description:
      "This is a basic Toast component example. Toasts are used to communicate a state that affects a system, feature or page",
  },
  "InputBasic-isInvalid": {
    completion: "InputBasic-isInvalid",
    imports: [
      {
        importName: "React",
        importType: "default",
        importAs: null,
        importFrom: "react",
      },
      {
        importName: "Input",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "InputField",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "InputIcon",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "InputSlot",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "SearchIcon",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "useState",
        importType: "named",
        importAs: null,
        importFrom: "react",
      },
    ],
    template:
      '<Input size={"sm"} variant={"outline"} isInvalid={true} isDisabled={false}>\n      <InputField onChange={(e: any) => {\n    setValue(e.nativeEvent.text);\n  }} value={value} placeholder="Enter Text here" />\n      <InputSlot pr="\\$4">\n        <InputIcon as={SearchIcon} />\n      </InputSlot>\n    </Input>',
    variableStatements:
      "const [value, setValue] = React.useState('')\nlet inputIconSize = ''",
    description:
      "This is a basic Input component example. Inputs are used to capture data from users.",
  },
  "ButtonBasic-link-isDisabled": {
    completion: "ButtonBasic-link-isDisabled",
    imports: [
      {
        importName: "React",
        importType: "default",
        importAs: null,
        importFrom: "react",
      },
      {
        importName: "Button",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
      {
        importName: "ButtonText",
        importType: "named",
        importAs: null,
        importFrom: "@gluestack-ui/themed",
      },
    ],
    template:
      '<Button action={"primary"} variant={"link"} size={"md"} isDisabled={true}>\n      <ButtonText>\n        Button\n      </ButtonText>\n    </Button>',
    variableStatements: "",
    description:
      "This is a basic Button component example.  A button is a component that users can tap to trigger an action.",
  },
};
