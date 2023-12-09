import * as vscode from "vscode";
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

import COMPONENT_COMPLETIONS from "./COMPONENT_COMPLETIONS";

// Constants for extension identifiers and commands
const ADD_DEPENDENT_CODE_COMMAND = "extension.addDependentCode";
const PREFIX = "gs-";

export class GluestackProvider implements vscode.CompletionItemProvider {
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): Promise<vscode.CompletionItem[]> {
    const linePrefix = document
      .lineAt(position)
      .text.substring(0, position.character);

    if (!linePrefix.endsWith(PREFIX)) {
      return [];
    }

    const startPos = position.translate(0, -PREFIX.length);

    const completionItems = Object.entries(COMPONENT_COMPLETIONS).map(
      ([snippetName, component]) => {
        const completionItem = new vscode.CompletionItem(
          snippetName,
          vscode.CompletionItemKind.Class
        );
        completionItem.insertText = new vscode.SnippetString(
          component.template
        );
        completionItem.additionalTextEdits = [
          vscode.TextEdit.replace(new vscode.Range(startPos, position), ""),
        ];
        completionItem.command = {
          command: ADD_DEPENDENT_CODE_COMMAND,
          title: "Add Dependent Code",
          arguments: [component],
        };
        completionItem.detail = component.completion;
        const imageUri = vscode.Uri.file(
          this.context.extensionPath + "/images/logo.png"
        );
        completionItem.documentation = new vscode.MarkdownString(
          `![Image](${imageUri}) \n\n ${component.description}`
        );

        completionItem.kind = vscode.CompletionItemKind.Snippet;
        completionItem.preselect = true;

        return completionItem;
      }
    );

    return completionItems;
  }
}

export function activate(context: vscode.ExtensionContext) {
  try {
    console.log("Congratulations, you are in activate of extension!");

    context.subscriptions.push(
      vscode.languages.registerCompletionItemProvider(
        ["typescript", "typescriptreact", "javascript", "javascriptreact"],
        new GluestackProvider(context),
        "g",
        "s",
        "-"
      )
    );

    // Register the command to add dependent code
    context.subscriptions.push(
      vscode.commands.registerCommand(
        ADD_DEPENDENT_CODE_COMMAND,
        async (component) => {
          try {
            await formatActiveDocument();
            await addVariableStatements(component.variableStatements);
            await formatActiveDocument();
            await addImports(component.imports);
            await formatActiveDocument();
          } catch (error) {
            console.error("Error adding dependent code:", error);
          }
        }
      )
    );
  } catch (error) {
    console.error("Error activating extension:", error);
  }
}

async function formatActiveDocument() {
  try {
    await vscode.commands.executeCommand("editor.action.formatDocument");
  } catch (error) {
    console.error("Error formatting document:", error);
  }
}

async function addVariableStatements(
  variableStatements: string
): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const code = document.getText();

    const selection = editor.selection;
    const cursorPosition = selection.active;
    const documentCursorOffset = document.offsetAt(cursorPosition);
    let functionNotFound = true;

    let foundFunctionalComponentNode: any = null;

    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    if (!isValidAST(ast)) {
      console.error(
        "AST validation failed. Unable to add variable statements."
      );
      return;
    }

    // Find the nearest functional component node
    traverse(ast, {
      ArrowFunctionExpression(path: any) {
        const { start, end } = path.node.loc;
        if (
          documentCursorOffset >= start.index &&
          documentCursorOffset <= end.index
        ) {
          foundFunctionalComponentNode = path.node;
          path.stop(); // Stop traversal once we've found a functional component
        }
      },
      FunctionDeclaration(path: any) {
        const { start, end } = path.node.loc;
        if (
          documentCursorOffset >= start.index &&
          documentCursorOffset <= end.index
        ) {
          foundFunctionalComponentNode = path.node;
          path.stop(); // Stop traversal once we've found a functional component
        }
      },
      FunctionExpression(path: any) {
        const { start, end } = path.node.loc;
        if (
          documentCursorOffset >= start.index &&
          documentCursorOffset <= end.index
        ) {
          foundFunctionalComponentNode = path.node;
          path.stop(); // Stop traversal once we've found a functional component
        }
      },
    });

    if (!foundFunctionalComponentNode) {
      // If no functional component was found, consider the top node
      foundFunctionalComponentNode = ast;
    }

    // Traverse the AST to find the target node (e.g., a function declaration)
    traverse(ast, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ArrowFunctionExpression(path) {
        if (
          functionNotFound === true &&
          path.node === foundFunctionalComponentNode
        ) {
          prependTextToNode(path.node, variableStatements);
          functionNotFound = false;
        } else {
          functionNotFound = true;
        }
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      FunctionDeclaration(path) {
        if (
          functionNotFound === true &&
          path.node === foundFunctionalComponentNode
        ) {
          prependTextToNode(path.node, variableStatements);
          functionNotFound = false;
        } else {
          functionNotFound = true;
        }
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      FunctionExpression(path) {
        if (
          functionNotFound === true &&
          path.node === foundFunctionalComponentNode
        ) {
          prependTextToNode(path.node, variableStatements);
          functionNotFound = false;
        } else {
          functionNotFound = true;
        }
      },
    });

    if (!functionNotFound) {
      prependTextToNode(foundFunctionalComponentNode, variableStatements);
    }

    const modifiedCode = generate(ast).code;

    const edit = new vscode.WorkspaceEdit();
    const range = new vscode.Range(
      new vscode.Position(0, 0), // Start position
      document.positionAt(document.getText().length) // End position (line count represents the entire file)
    );

    edit.replace(document.uri, range, modifiedCode);

    await vscode.workspace.applyEdit(edit);
  }
}

async function addImports(imports: any[]): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;

    const code = document.getText();

    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    if (!isValidAST(ast)) {
      console.error("AST validation failed. Unable to add import statements.");
      return;
    }

    const importsUsed = importsToArray(code, ast);
    const importsToAdd = findObjectsNotInArray(imports, importsUsed);
    const importStatements = arrayToImports(importsToAdd);

    const edit = new vscode.WorkspaceEdit();
    edit.insert(
      document.uri,
      new vscode.Position(0, 0),
      importStatements + "\n\n"
    );
    await vscode.workspace.applyEdit(edit);
  }
}

function prependTextToNode(node: any, textToPrepend: any) {
  if (node.body.body) {
    // Add the text to the beginning of the body
    node.body.body.unshift(parser.parse(textToPrepend).program.body[0]);
  }
}

function importsToArray(fileContent: any, ast: any) {
  const importDetails: any = [];

  traverse(ast, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ImportDeclaration(path) {
      const { specifiers, source } = path.node;
      const importFrom = source.value;

      specifiers.forEach((specifier: any) => {
        const importName = specifier?.imported?.name || specifier?.local?.name;
        const importType =
          specifier.type === "ImportDefaultSpecifier" ||
          specifier.local.name === "default"
            ? "default"
            : "named";
        const importAs =
          specifier.type === "ImportDefaultSpecifier" ||
          specifier.local.name === importName
            ? null
            : specifier.local.name;

        importDetails.push({
          importName,
          importType,
          importAs,
          importFrom,
        });
      });
    },
  });

  return importDetails;
}

function arrayToImports(importDetails: any): string {
  const groupedImports: any = {};

  // Group imports by importFrom
  for (const detail of importDetails) {
    const { importFrom } = detail;
    if (!groupedImports[importFrom]) {
      groupedImports[importFrom] = [];
    }
    groupedImports[importFrom].push(detail);
  }

  const importStrings: string[] = [];

  // Generate import statements for each group
  for (const importFrom in groupedImports) {
    const imports = groupedImports[importFrom];
    const namedImports = imports.filter(
      (detail: any) => detail.importType === "named"
    );
    const defaultImport = imports.find(
      (detail: any) => detail.importType === "default"
    );

    if (imports.length === 1) {
      // Single import, no need to group
      const [detail] = imports;
      if (detail.importType === "default") {
        // Default import
        importStrings.push(
          `import ${detail.importAs || detail.importName} from '${importFrom}';`
        );
      } else {
        // Named import
        const importName = detail.importAs
          ? `${detail.importName} as ${detail.importAs}`
          : detail.importName;
        importStrings.push(`import { ${importName} } from '${importFrom}';`);
      }
    } else {
      // Group multiple imports from the same source
      const importStatementParts = [];

      if (defaultImport) {
        // Default import
        importStatementParts.push(
          `${defaultImport.importName}${namedImports.length > 0 ? "," : ""}`
        );
      }

      if (namedImports.length > 0) {
        // Named imports
        const groupedImportNames = namedImports
          .map((detail: any) =>
            detail.importAs
              ? `${detail.importName} as ${detail.importAs}`
              : detail.importName
          )
          .join(", ");

        importStatementParts.push(`{ ${groupedImportNames} }`);
      }

      importStatementParts.push(`from '${importFrom}';`);

      importStrings.push(`import ${importStatementParts.join(" ")}\n`);
    }
  }

  return importStrings.join("");
}

function findObjectsNotInArray(a1: any, a2: any) {
  // Use filter to keep objects from a1 that are not in a2
  const objectsNotInA2 = a1.filter((objA1: any) => {
    // Use some to check if objA1 is not in a2
    return !a2.some((objA2: any) => {
      // Compare objects based on their properties
      return (
        objA1.importName === objA2.importName &&
        objA1.importType === objA2.importType &&
        objA1.importAs === objA2.importAs &&
        objA1.importFrom === objA2.importFrom
      );
    });
  });

  return objectsNotInA2;
}

function isValidAST(code: any) {
  try {
    // Use eval to parse and execute the code
    eval(code);
    return true;
  } catch (error) {
    // If an error occurs during parsing/execution, return false
    return false;
  }
}
