//
//  CatalogItemModel.swift
//  FoundIt
//
//  Created by Adam Zafir on 5/25/25.
//

import Foundation
import Combine
import SwiftUICore



struct CatalogItem: Identifiable {
    let id = UUID()
    let name: String
    let image: Image
    let placedAtNow: String
    let found: String
}


class ContentViewModel: ObservableObject {
    @Published var items: [CatalogItem] = []
}



